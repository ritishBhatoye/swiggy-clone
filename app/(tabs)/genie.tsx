import React, { useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default function GenieTab() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userInput = newMessages[0]?.text || "";
    setLoading(true);

    const prompt = formatPrompt(
      userInput,
      detectMood(userInput),
      getTimeOfDay(),
      "none"
    );

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;

      const aiReply: IMessage = {
        _id: Date.now() + 1,
        text: response.text(),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Genie AI",
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [aiReply])
      );
    } catch (err) {
      console.error("Gemini API Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View className="flex-1">
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
        placeholder="Ask me about food..."
      />
      {loading && (
        <View className="absolute top-1/2 left-1/2 -translate-x-5 -translate-y-5">
          <ActivityIndicator size="large" color="#EF4F27" />
        </View>
      )}
    </View>
  );
}

function formatPrompt(
  userInput: string,
  mood: string,
  timeOfDay: string,
  dietType: string
) {
  return `
You are Genie, an AI food recommender in an Indian food delivery app.
User Mood: ${mood}
Time of Day: ${timeOfDay}
Diet Preference: ${dietType}
User said: "${userInput}"

Respond with a personalized food suggestion with explanation.
`;
}

function detectMood(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("tired")) return "low energy";
  if (t.includes("happy")) return "joyful";
  if (t.includes("sad")) return "comfort seeking";
  return "neutral";
}

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 11) return "morning";
  if (hour < 16) return "afternoon";
  if (hour < 21) return "evening";
  return "night";
}
