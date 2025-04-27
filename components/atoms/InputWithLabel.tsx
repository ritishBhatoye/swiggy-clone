// app/components/InputWithLabel.js
import React from "react";
import { View, Text, TextInput, ColorSchemeName } from "react-native";
import { useColorScheme } from "react-native";

const InputWithLabel = ({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const isDarkMode: boolean = colorScheme === "dark";

  return (
    <View className="mb-4">
      {/* Label */}
      <Text
        className={`text-primary-500 font-semibold mb-1 ${
          isDarkMode ? "text-white" : "text-primary-500"
        }`}
      >
        {label}
      </Text>

      {/* Input Container with Continuous Border */}
      <View className="border-2 border-swiggy-primary rounded-lg p-2 bg-swiggy-accent-light">
        <TextInput
          className="text-swiggy-text text-base w-full"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#333333"}
          style={{ height: 40 }} // Ensure consistent height
        />
      </View>
    </View>
  );
};

export default InputWithLabel;
