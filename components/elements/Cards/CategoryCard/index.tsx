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
      <View className="aspect-square flex flex-col relative">
        <Image
          source={category.image}
          className="h-32 w-32 p-5 pb-8 bg-black/40 rounded-3xl "
          resizeMode="contain"
        />
        <View className="absolute bottom-1 left-1/4">
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
