import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setMessages as updateMessages } from "@/store/features/genieSlice";

import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { TypingAnimation } from "react-native-typing-animation";
import { LinearGradient } from "expo-linear-gradient";

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
    if (loading) return;

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
        handleSend(filterMessage);
      }

      return newFilters;
    });
  };

  const handleSend = async (customInput?: string) => {
    const finalInput = customInput || input;
    if (!finalInput.trim()) return;

    const userMessage = { role: "user", text: finalInput };
    setMessages((prev: any) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const prompt = formatPrompt(
      finalInput,
      detectMood(finalInput),
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
    <LinearGradient
      colors={["#fff5eb", "#ffe0cc"]}
      className="flex-1"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView className="flex-1 px-4 pt-6">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <ScrollView className="flex-1">
            {messages.map((msg: any, index: number) => (
              <Animated.View
                key={index}
                entering={FadeIn}
                exiting={FadeOut}
                className={`mb-2 p-3 rounded-xl max-w-[80%] ${
                  msg.role === "user"
                    ? "self-end bg-orange-100"
                    : "self-start bg-gray-100"
                }`}
              >
                <Text className="text-gray-800 text-base">{msg.text}</Text>
              </Animated.View>
            ))}

            {loading && (
              <View className="flex flex-row gap-2 items-center ml-2">
                <TypingAnimation
                  dotColor="#EF4F27"
                  dotAmplitude={4}
                  dotSpeed={0.15}
                  dotRadius={4}
                  dotMargin={5}
                />
              </View>
            )}
          </ScrollView>

          <View className="flex flex-col pt-4">
            <View className="flex-row flex-wrap gap-2 px-2 mb-4">
              {filters.map((filter) => (
                <Animated.View
                  key={filter}
                  entering={FadeIn.duration(300)}
                  exiting={FadeOut.duration(300)}
                >
                  <TouchableOpacity
                    onPress={() => toggleFilter(filter)}
                    disabled={loading}
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
                </Animated.View>
              ))}
            </View>

            <View className="flex-row items-center justify-end gap-2 mb-20">
              <TextInput
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 bg-white"
                placeholder="Ask Genie..."
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity
                onPress={() => handleSend()}
                disabled={loading}
                className={`px-4 py-3 rounded-full ${
                  loading ? "bg-orange-300" : "bg-orange-500"
                }`}
              >
                <Text className="text-white font-semibold">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
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
