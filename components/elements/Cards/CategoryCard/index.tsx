import React from "react";

import { View, Text } from "react-native";

export const CategoryCard = () => {
  return (
    <View className="flex flex-row items-center">
      <View className="aspect-square"></View>

      <View className="flex flex-col items-start">
        <Text className="text-base font-semibold"></Text>
        <Text className="text-medium font-semibold"></Text>

        <View></View>
      </View>
    </View>
  );
};
