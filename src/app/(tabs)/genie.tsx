// GenieTab.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setMessages as updateMessages } from "@/store/genieSlice"; // assuming genieSlice is configured

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default function GenieTab() {
  const dispatch = useDispatch();
  const savedMessages = useSelector((state: any) => state.genie.messages);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(savedMessages || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    saveMessages(messages);
    dispatch(updateMessages(messages));
  }, [messages]);

  const loadMessages = async () => {
    try {
      const stored = await AsyncStorage.getItem("genie_messages");
      if (stored) {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
      }
    } catch (e) {
      console.error("Failed to load messages:", e);
    }
  };

  const saveMessages = async (msgs: any) => {
    try {
      await AsyncStorage.setItem("genie_messages", JSON.stringify(msgs));
    } catch (e) {
      console.error("Failed to save messages:", e);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
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

      const aiMessage = { role: "genie", text: response.text() };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Gemini API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <ScrollView className="flex-1 mb-4">
        {messages.map((msg, index) => (
          <View
            key={index}
            className={`mb-2 p-3 rounded-xl max-w-[80%] ${
              msg.role === "user"
                ? "self-end bg-orange-100"
                : "self-start bg-gray-100"
            }`}
          >
            <Text className="text-gray-800 text-base">{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {loading && (
        <ActivityIndicator size="large" color="#EF4F27" className="mb-3" />
      )}

      <View className="flex-row items-center gap-2 mb-4">
        <TextInput
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 bg-white"
          placeholder="Ask Genie..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          onPress={handleSend}
          className="px-4 py-3 bg-orange-500 rounded-full"
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
