import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import LottieView from "lottie-react-native";

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(
  "AIzaSyDh1rUYZ8pdOzKDtkzD70MfVO8uSYmEJbM"
);

export const getGeminiResponse = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const Assistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setLoading(true);

    try {
      const response = await getGeminiResponse(
        `You are an event booking assistant. Please help with the following query: ${userMessage}`
      );
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
          isUser: false,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 bg-white mt-10">
      <ScrollView className="flex-1 p-4">
        {messages.map((message, index) => (
          <View
            key={index}
            className={`mb-4 ${message.isUser ? "items-end" : "items-start"}`}
          >
            <View
              className={`p-3 rounded-lg max-w-[80%] ${
                message.isUser ? "bg-primary-500" : "bg-primary-100"
              }`}
            >
              <Text className={message.isUser ? "text-white" : "text-black"}>
                {message.text}
              </Text>
            </View>
          </View>
        ))}
        {loading && (
          <View className="items-center justify-center p-4">
            <LottieView
              source={{
                uri: "https://lottie.host/66db2896-24f8-4c3f-97a5-66b9f1907bdc/zdMMMHuS6z.json",
              }}
              autoPlay
              loop
              style={{ width: 100, height: 100 }}
            />
          </View>
        )}
      </ScrollView>

      <View className="p-4 border-t border-gray-200 flex-row items-center">
        <TextInput
          className="flex-1 border border-primary-100 rounded-full px-4 py-2 mr-2"
          value={input}
          onChangeText={setInput}
          placeholder="Ask about event booking..."
          multiline
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={loading}
          className={`w-10 h-10 rounded-full items-center justify-center ${
            loading ? "bg-primary-300" : "bg-primary-500"
          }`}
        >
          {loading ? (
            <LottieView
              source={{
                uri: "https://lottie.host/fbe1323d-d80e-44ed-8b88-1903c17a61eb/vHxHRDvZRW.json",
              }}
              autoPlay
              loop
              style={{ width: 24, height: 24 }}
            />
          ) : (
            <MaterialCommunityIcons name="send" size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
