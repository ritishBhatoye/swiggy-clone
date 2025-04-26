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
    <View className="flex flex-row items-center w-full">
      <View className="aspect-square relative">
        <Image
          source={category.image}
          className="h-32 w-32 p-5 pt-1/3 bg-black rounded-3xl "
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
