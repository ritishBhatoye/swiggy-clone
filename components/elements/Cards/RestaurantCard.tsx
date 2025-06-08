import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface props {
  restaurant: RestaurantCardDataType;
}

const RestaurantCard = ({ restaurant }: props) => {
  return (
    <TouchableOpacity className="rounded-2xl">
      <Image source={{ uri: restaurant.image }} />
      <View className="gap-4">
        <View className="items-center justify-between flex-row">
          <Text className="text-lg font-bold">{restaurant.name}</Text>
          <Text className="text-sm font-semibold">{restaurant.rating}</Text>
        </View>
        <Text className="text-gray-400 text-sm font-light">
          {" "}
          {restaurant.location}
        </Text>
        <Text className="text-gray-400 text-sm font-light">
          {restaurant.popularDish}
        </Text>
        {restaurant.offers.map((offer: string) => (
          <View className="flex-row gap-1 items-center">
            <Ionicons name="pricetag-outline" color={"primary"} size={20} />
            <Text className="text-gray-400 text-sm font-light">{offer}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
