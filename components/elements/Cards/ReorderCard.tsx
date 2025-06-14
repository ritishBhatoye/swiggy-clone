import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const ReorderCard = () => {
  return (
    <View className="bg-white rounded-xl border">
      <View className="rounded-t-xl bg-gray-300 flex flex-row items-start justify-between">
        <View className="flex flex-row items-center gap-2">
          <Image source={{ uri: "" }} style={{ width: 100, height: 100 }} />
          <View className="flex flex-col items-start">
            <Text className="text-md text-black font-bold"></Text>
            <View className="flex flex-row items-center">
              <Ionicons name="pricetag-outline" color={"#EF4F27"} size={8} />
              <Text className="text-sm">Items at ₹ </Text>
              <Text className="text-md text-black font-bold ">+</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={15} color={"#6b7280"} />
        </TouchableOpacity>
      </View>
      <View className="">
        <View>
          <Ionicons
            name="radio-button-on"
            size={20}
            color={isVeg ? "#00FF00" : "#FF0000"}
            style={{ marginRight: 5 }}
          />
          <View className="flex flex-col items-start">
            <Text className="text-black text-lg font-medium"></Text>
            <Text className="text-black text-sm font-medium"></Text>
          </View>
          <Ionicons
            name="add-outline"
            color={"#00FF00"}
            size={12}
            className="p-2 border-[0.3px] rounded-md"
          />
        </View>
      </View>
    </View>
  );
};

export default ReorderCard;
