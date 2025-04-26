import React from "react";
import { View, Text } from "react-native";

export const TitleWithBar = ({ title }: { title: string }) => {
  return (
    <View className="flex-row items-center w-full">
      <Text className="text-base font-extralight text-gray-800 mr-2">
        {title}
      </Text>
      <View className="flex-1 border-b-[0.4px] border-gray-600" />
    </View>
  );
};
