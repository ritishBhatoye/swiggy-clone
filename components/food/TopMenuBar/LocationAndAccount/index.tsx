import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { View, Text, TouchableOpacity } from "react-native";

const LocationAndAccount = () => {
  return (
    <View className="flex flex-row items-center gap-4 justify-between w-full">
      <View className="flex flex-col items-start gap-2">
        <View className="flex flex-row items-center gap-2">
          <Ionicons name="location-outline" size={16} color={"primary-500"} />

          <Text className="text-black text-md font-semibold">Patara</Text>
          <Ionicons name="chevron-down" size={18} color={"black"} />
        </View>
        <Text className="text-black font-normal text-sm">
          Bank of India, Patara Village, Patara...
        </Text>
      </View>
      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity>
          <View className="border-primary-600 border-2 px-2 justify-center bg-white rounded-2xl">
            <Text className="text-primary-600 font-bold text-sm">one</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="rounded-full flex justify-center bg-black/50 p-2">
            <Ionicons name="person" size={18} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationAndAccount;
