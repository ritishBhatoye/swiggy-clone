import React from "react";
import { Pressable, Text, GestureResponderEvent } from "react-native";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "isWhite";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  className?: string;
  textClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  className = "",
  textClassName = "",
}) => {
  const getButtonStyle = (): string => {
    switch (variant) {
      case "primary":
        return "bg-primary-500";
      case "secondary":
        return "bg-secondary-golden-500";
      case "tertiary":
        return "bg-tertiary-yellow-500";
      case "isWhite":
        return "bg-white";
      default:
        return "bg-primary-400";
    }
  };

  const getTextStyle = (): string => {
    switch (variant) {
      case "isWhite":
        return "text-primary-400";
      default:
        return "text-white";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "px-4 py-3 rounded-xl items-center",
        getButtonStyle(),
        className
      )}
    >
      <Text
        className={clsx(
          "text-base font-semibold",
          getTextStyle(),
          textClassName
        )}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
