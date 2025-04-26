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
      <View className="aspect-square rounded-lg relative">
        <Image
          source={category.image}
          className="h-24 w-24 pt-1/3"
          resizeMode="contain"
        />
        <View className="absolute right-0">
          <Text className="text-white text-base font-semibold">
            {category.offer}
          </Text>
        </View>
      </View>

      <View className="flex flex-col items-start gap-0.5">
        {/* FoodItem */}
        <Text className="text-base font-semibold">{category.item}</Text>
        <Text className="text-sm font-semibold">
          {category.rating} • {category.deliveryTime}{" "}
        </Text>
        <Text className="text-sm font-medium">
          {" "}
          {category.location} • {category.distance}
        </Text>
      </View>
    </View>
  );
};
