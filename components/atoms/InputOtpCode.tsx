import React, { useRef, useState } from "react";
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
  onOtpChange?: (otp: string) => void;
}

const InputOtpCode: React.FC<InputOtpCodeProps> = ({
  label,
  size = "md",
  length = 6,
  onOtpChange,
  ...rest
}) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const isDarkMode: boolean = colorScheme === "dark";
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<TextInput[]>([]);

  const sizeStyles = {
    sm: "text-sm p-2",
    md: "text-base p-3",
    lg: "text-lg p-4",
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onOtpChange?.(newOtp.join(""));

    // Auto-focus next input
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="mb-4">
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
                maxLength={1}
                keyboardType="number-pad"
                value={otp[index]}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
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
