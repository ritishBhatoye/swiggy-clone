import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
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
  const [showTyping, setShowTyping] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadMessages();
    rotateFilters();
  }, []);

  useEffect(() => {
    saveMessages(messages);
    dispatch(updateMessages(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

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
    setShowTyping(true);

    const prompt = formatPrompt(
      finalInput,
      detectMood(finalInput),
      getTimeOfDay(),
      selectedFilters.join(", ")
    );

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const fullResponse = response.text();

      const newMessage = { role: "genie", text: "" };
      setMessages((prev: any) => [...prev, newMessage]);

      for (let i = 0; i <= fullResponse.length; i++) {
        const partial = fullResponse.slice(0, i);
        await new Promise((res) => setTimeout(res, 15)); // typing speed
        setMessages((prev: any) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...newMessage, text: partial };
          return updated;
        });
      }
    } catch (err) {
      console.error("Gemini API Error:", err);
    } finally {
      setLoading(false);
      setShowTyping(false);
    }
  };

  return (
    <LinearGradient
      colors={["#EF4F27 ", "#FF9440", "#ffe0cc", "#ffffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ height: "100%" }}
    >
      <SafeAreaView className="w-11/12 mx-auto pt-6 flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            ref={scrollViewRef}
            onContentSizeChange={scrollToBottom}
          >
            {messages.map((msg: any, index: number) => (
              <Animated.View
                key={index}
                entering={FadeIn}
                exiting={FadeOut}
                className={`my-4 p-3 rounded-xl max-w-[80%] ${
                  msg.role === "user"
                    ? "self-end bg-orange-200"
                    : "self-start bg-primary-600"
                }`}
              >
                <Text
                  className={`${
                    msg.role === "user" ? "text-gray-800" : "text-white"
                  }  text-base`}
                >
                  {msg.text}
                </Text>
              </Animated.View>
            ))}

            {showTyping && (
              <View className="flex flex-row gap-2 items-center ml-2 mb-2">
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
