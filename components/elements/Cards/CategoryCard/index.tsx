import { CategoryCardDataType } from "@/types";
import React from "react";

import { View, Text } from "react-native";
import { Image } from "react-native";
export const CategoryCard = ({
  category,
}: {
  category: CategoryCardDataType;
}) => {
  return (
    <View className="flex flex-row items-center">
      <View className="aspect-square rounded-lg">
        <Image
          source={category.image}
          className="h-24 w-24 pt-1/3"
          resizeMode="contain"
        />
      </View>

      <View className="flex flex-col items-start">
        <Text className="text-base font-semibold"></Text>
        <Text className="text-medium font-semibold"></Text>

        <View></View>
      </View>
    </View>
  );
};
