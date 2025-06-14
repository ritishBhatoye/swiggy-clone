import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

interface props {
  items: ReorderCardDataType;
}

const ReorderCard = ({ items }: props) => {
  const restaurant = items.restaurant;
  const itemsOrdered = items.itemsOrdered;
  return (
    <TouchableOpacity className="bg-white p-2.5 border-white rounded-xl border-[0.3px]">
      <View className="rounded-t-xl  p-4 bg-gray-200 flex flex-row items-start justify-between">
        <View className="flex flex-row items-center gap-3">
          <Image
            source={{ uri: restaurant?.image }}
            style={{ width: 80, height: 70, borderRadius: 10 }}
          />
          <View className="flex flex-col items-start gap-4">
            <Text className="text-md text-black font-bold">
              {restaurant.name} {restaurant.deliveryTime}
            </Text>
            <View className="flex flex-row items-center gap-2">
              <Ionicons name="pricetag-outline" color={"#EF4F27"} size={15} />
              <Text className="text-sm">Items at ₹{items.cheapDishPrice}</Text>
              <Text className="text-md text-black font-bold ">+</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={15} color={"#6b7280"} />
        </TouchableOpacity>
      </View>
      <View className="flex mt-2 flex-row items-center justify-between">
        <View className="flex flex-row items-start">
          <Ionicons
            name="radio-button-on"
            size={20}
            color={itemsOrdered.isVeg ? "#00FF00" : "#FF0000"}
            style={{ marginRight: 5 }}
          />
          <View className="flex flex-col items-start">
            <Text className="text-black text-lg font-medium">
              {itemsOrdered.dish}
            </Text>
            <Text className="text-black text-sm font-medium">
              {itemsOrdered.price}
            </Text>
          </View>
        </View>
        <Ionicons
          name="add"
          color={"#00FF00"}
          size={20}
          className="p-2 border-[0.3px] border-gray-400 rounded-md"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ReorderCard;
