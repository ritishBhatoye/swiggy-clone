import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ColorSchemeName,
} from "react-native";
import { useColorScheme } from "react-native";
import clsx from "clsx";

type OtpInputSize = "sm" | "md" | "lg";
type OtpLength = 4 | 6;

interface InputOtpCodeProps extends Omit<TextInputProps, "onChangeText"> {
  label?: string;
  size?: OtpInputSize;
  length?: OtpLength;
  value: string; // The full OTP string from parent
  onOtpChange?: (otp: string) => void;
}

const InputOtpCode: React.FC<InputOtpCodeProps> = ({
  label,
  size = "md",
  length = 6,
  value, // Use this as the source of truth
  onOtpChange,
  ...rest
}) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const isDarkMode: boolean = colorScheme === "dark";
  const inputRefs = useRef<TextInput[]>([]);
  const hiddenInputRef = useRef<TextInput>(null);

  // Split the incoming value into an array of characters for display
  const otpArray = value.split("").slice(0, length);
  while (otpArray.length < length) {
    otpArray.push(""); // Ensure all fields are represented
  }

  const sizeStyles = {
    sm: "text-sm p-2",
    md: "text-base p-3",
    lg: "text-lg p-4",
  };

  const handleOtpChange = (text: string, index: number) => {
    // If multiple characters are entered, assume it's a paste
    if (text.length > 1) {
      handlePaste(text); // Let handlePaste manage the full update
      return;
    }

    const newOtpArray = [...otpArray];
    if (text.length === 1) {
      newOtpArray[index] = text; // Set the single character
    } else {
      newOtpArray[index] = ""; // Clear the field if text is empty (backspace)
    }

    onOtpChange?.(newOtpArray.join(""));

    // Auto-focus next input only if a character was entered
    if (text.length === 1 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (text: string) => {
    const numbers = text.replace(/[^0-9]/g, "");
    const pastedOtpArray = numbers.split("").slice(0, length);

    // Call onOtpChange with the correctly formatted pasted string
    onOtpChange?.(pastedOtpArray.join(""));
  };

  return (
    <View className="my-9 w-9/12 mx-auto">
      {label && (
        <Text
          className={clsx(
            "font-semibold mb-1",
            isDarkMode ? "text-white" : "text-primary-500"
          )}
        >
          {label}
        </Text>
      )}

      {/* Hidden input for pasting */}
      <TextInput
        ref={hiddenInputRef}
        style={{ position: "absolute", opacity: 0, height: 0 }}
        onChangeText={handlePaste} // This handles the full pasted string
        keyboardType="number-pad"
        maxLength={length}
      />

      <View className="flex-row justify-between gap-2">
        {Array(length)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              className={clsx(
                "rounded-lg bg-swiggy-accent-light border border-swiggy-primary",
                sizeStyles[size]
              )}
            >
              <TextInput
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                className={clsx(
                  "text-swiggy-text text-center",
                  sizeStyles[size]
                )}
                maxLength={1} // Each input only takes one digit
                keyboardType="number-pad"
                value={otpArray[index]} // Each input displays one digit from the derived array
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => hiddenInputRef.current?.focus()} // Keep this for redirection
                placeholderTextColor={isDarkMode ? "#CCCCCC" : "#333333"}
                {...rest}
              />
            </View>
          ))}
      </View>
    </View>
  );
};

export default InputOtpCode;
