import { CarouselCardType } from "@/types";
import React from "react";

import { TouchableOpacity, View } from "react-native";
import { Image, Text } from "react-native";

const Card = ({ item }: { item: CarouselCardType }) => {
  return (
    <TouchableOpacity
      className="flex-1 mx-1 rounded-xl overflow-hidden bg-white shadow-lg"
      activeOpacity={0.9}
      //   onPress={() => {
      //     console.log("Selected:", item.shopName);
      //   }}
    >
      <View className="flex-row h-full">
        {/* Left side - Image */}
        <View className="w-1/2 p-3 justify-between">
          <View className="space-y-1">
            <Text
              className="text-base font-bold text-gray-800 leading-tight"
              numberOfLines={1}
            >
              {item.shopName}
            </Text>

            <Text className={`text-${item.color} font-bold text-md`}>
              Get Up To {item.offer}% OFF
            </Text>

            <Text className="text-sm text-gray-600" numberOfLines={2}>
              {item.itemName}
            </Text>
          </View>

          <View className="space-y-2">
            {/* Rating */}
            <View className="flex-row items-center space-x-1">
              <View className="bg-green-500 px-2 py-0.5 rounded">
                <Text className="text-white font-bold text-xs">
                  ★ {item.rating}
                </Text>
              </View>
            </View>

            {/* Delivery Time */}
            <Text className="text-xs text-gray-500">{item.deliveryTime}</Text>
          </View>
        </View>

        {/* Right side - Content */}
        <View className="w-1/2 relative">
          <Image
            source={{ uri: item.itemImage }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Offer Badge */}
          <View className="absolute top-2 left-2"></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
