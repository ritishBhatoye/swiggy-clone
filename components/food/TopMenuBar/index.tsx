import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { View, Text } from "react-native";

const TopMenuBar = () => {
  return (
    <View className="flex flex-row items-center gap-4 justify-between">
      <View className="flex flex-col items-start">
        <View className="flex flex-row">
          <Ionicons name="share" size={20} color={"primary-500"} />

          <Text className="text-black text-md font-semibold">Patara</Text>
          <Ionicons name="chevron-down" size={20} color={"white"} />
        </View>
        <Text className="text-black font-normal text-sm">
          Bank of India, Patara Village, Patara...
        </Text>
      </View>
      <View className="flex flex-row items-center">
        <View className="border-primary-600 justify-center bg-white rounded-3xl">
          <Text className="text-primary-600 font-bold text-sm">one</Text>
        </View>
        <View className="rounded-full flex justify-center bg-black/50 p-2">
          <Ionicons name="person" size={20} color={"white"} />
        </View>
      </View>
    </View>
  );
};

export default TopMenuBar;
