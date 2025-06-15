// GenieTab.tsx
import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Bubble, ChatMessage, ChatView } from "react-native-chat-ui";
import { GoogleGenerativeAI } from "@google/generative-ai";
import uuid from "react-native-uuid";

// Replace with your actual Gemini API Key
const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default function GenieTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: uuid.v4().toString(),
      type: "text",
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const prompt = formatPrompt(
      input,
      detectMood(input),
      getTimeOfDay(),
      "none"
    );

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;

      const aiMessage: ChatMessage = {
        id: uuid.v4().toString(),
        type: "text",
        role: "assistant",
        content: response.text(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Gemini API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ChatView
        messages={messages}
        renderBubble={(props) => <Bubble {...props} />}
      />

      {loading && (
        <ActivityIndicator
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          size="large"
          color="#EF4F27"
        />
      )}

      <View className="flex-row items-center border-t border-gray-200 p-2 bg-white">
        <TextInput
          className="flex-1 px-4 py-2 rounded-full border border-gray-300"
          placeholder="Ask Genie..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          onPress={handleSend}
          className="ml-2 px-4 py-2 bg-orange-500 rounded-full"
        >
          <Text className="text-white font-semibold">Send</Text>
        </TouchableOpacity>
      </View>
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
