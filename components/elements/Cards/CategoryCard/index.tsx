import { CategoryCardDataType } from "@/types";
import React from "react";

import { View, Text } from "react-native";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const CategoryCard = ({
  category,
}: {
  category: CategoryCardDataType;
}) => {
  return (
    <View className="flex flex-row items-center w-full gap-5">
      <View className="aspect-square flex flex-col relative">
        <Image
          source={{ uri: category.image }}
          className="h-36 w-32 rounded-3xl "
          resizeMode="cover"
        />
        <View className="absolute -bottom-3 w-full">
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.4)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: 100,
              borderBottomStartRadius: 24,
              paddingHorizontal: 0,
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text className="text-white text-base font-extrabold">
              {category.offer}
            </Text>
          </LinearGradient>
        </View>
      </View>

      <View className="flex flex-col items-start gap-0.5">
        {/* FoodItem */}
        <Text className="text-lg font-semibold">{category.item}</Text>
        <Text className="text-sm font-semibold">
          {category.rating} • {category.deliveryTime}{" "}
        </Text>
        <Text className="text-sm font-medium">
          {" "}
          {category.location} • {category.distance}
        </Text>
        <View className="flex flex-row items-center gap-4">
          <View className="flex flex-col items-start">
            <Text className="text-primary-500 font-extrabold text-lg">
              EXTRA 20% OFF
            </Text>
            <Text className="text-primary-500 font-medium text-base">
              FREE DELIVERY 20% OFF
            </Text>
          </View>
          <Text className="text-primary-500 px-2 border font-extrabold border-primary-500 rounded-xl">
            one
          </Text>
        </View>
      </View>
    </View>
  );
};
