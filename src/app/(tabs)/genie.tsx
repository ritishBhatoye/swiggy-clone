import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setMessages as updateMessages } from "@/store/features/genieSlice";

const genAI = new GoogleGenerativeAI("AIzaSyDh1rUYZ8pdOzKDtkzD70MfVO8uSYmEJbM");
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

const allFilters = [
  "High Protein",
  "Low Carb",
  "Spicy",
  "Mild",
  "South Indian",
  "North Indian",
  "Veg",
  "Non-Veg",
];

export default function GenieTab() {
  const dispatch = useDispatch();
  const savedMessages = useSelector((state: any) => state.genie.messages);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(savedMessages || []);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    loadMessages();
    rotateFilters();
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

  const rotateFilters = () => {
    const shuffled = [...allFilters].sort(() => 0.5 - Math.random());
    setFilters(shuffled.slice(0, 4));
    setSelectedFilters([]);
  };

  const toggleFilter = (filter: string) => {
    if (loading) return; // Prevent toggling while API call is in progress

    setSelectedFilters((prev) => {
      const newFilters = prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter];

      const filterMessage =
        newFilters.length > 0
          ? `Suggest food based on these filters: ${newFilters.join(", ")}`
          : "";
      setInput(filterMessage);

      if (filterMessage) {
        handleSend();
      }

      return newFilters;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev: any) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const prompt = formatPrompt(
      input,
      detectMood(input),
      getTimeOfDay(),
      selectedFilters.join(", ")
    );

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;

      const aiMessage = { role: "genie", text: response.text() };
      setMessages((prev: any) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Gemini API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-6">
      {/* Filter Chips */}
      <View className="flex-row flex w-full gap-2 px-3 mb-4">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => toggleFilter(filter)}
            disabled={loading} // Disable button while loading
            className={`px-3 py-1 rounded-full border ${
              selectedFilters.includes(filter)
                ? "bg-orange-500 border-orange-500"
                : "border-gray-300"
            } ${loading ? "opacity-50" : ""}`}
          >
            <Text
              className={`text-sm ${
                selectedFilters.includes(filter)
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1">
        {messages.map((msg: any, index: any) => (
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

      <View className="flex-row flex items-center justify-end gap-2 mb-24">
        <TextInput
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 bg-white"
          placeholder="Ask Genie..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={loading} // Disable send button while loading
          className={`px-4 py-3 rounded-full ${
            loading ? "bg-orange-300" : "bg-orange-500"
          }`}
        >
          <Text className="text-white font-semibold">Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
Diet Filters: ${dietType}
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
