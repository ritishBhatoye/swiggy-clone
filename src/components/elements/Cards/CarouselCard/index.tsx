import { CarouselCardType } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

import { TouchableOpacity, View } from "react-native";
import { Image, Text } from "react-native";

const CarouselCard = ({ item }: { item: CarouselCardType }) => {
  return (
    <TouchableOpacity
      className="mx-1 rounded-xl overflow-hidden bg-white  shadow-lg "
      activeOpacity={0.9}
      //   onPress={() => {
      //     console.log("Selected:", item.shopName);
      //   }}
    >
      <LinearGradient
        colors={[item.color, "#ffff", "#ffff"]}
        locations={[1, 1, 0.1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-10/12"
        style={{ borderRadius: 24 }}
      >
        <View className="flex-row flex h-full items-center justify-between gap-3 py-3">
          {/* Left side - Image */}

          <View className="space-y-1 h-full flex flex-col items-start  p-6">
            <Text
              className="text-base font-bold text-gray-500 leading-tight"
              numberOfLines={1}
            >
              {item.shopName}
            </Text>

            <Text style={{ color: item.color }} className={`font-bold text-md`}>
              Get Up To {item.offer}% OFF
            </Text>

            <Text
              className="text-sm text-gray-600 font-light"
              numberOfLines={2}
            >
              {item.itemName}
            </Text>

            <View
              className={`rounded-3xl  p-2 mt-auto`}
              style={{ backgroundColor: item.color }}
            >
              <Text className="text-white">ORDER NOW</Text>
            </View>
          </View>

          {/* Right side - Content */}
          <View className="flex items-center">
            <Image
              source={{ uri: item.itemImage }}
              className="h-44 w-44 pt-1/3"
              resizeMode="cover"
            />
            {/* Offer Badge */}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CarouselCard;
