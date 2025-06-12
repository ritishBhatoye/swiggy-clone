import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { View, Text, TouchableOpacity } from "react-native";

const LocationAndAccount = () => {
  return (
    <View className="flex flex-row items-center gap-4 justify-between w-full">
      <View className="flex flex-col items-start gap-2">
        <View className="flex flex-row items-center gap-2">
          <Ionicons name="send" size={16} color={"#EF4F27"} />

          <Text className="text-black text-lg font-bold">Patara</Text>
          <Ionicons name="chevron-down" size={18} color={"black"} />
        </View>
        <Text className="text-black font-normal text-sm">
          Bank of India, Patara Village, Patara...
        </Text>
      </View>
      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity>
          <View className="border-primary-600 border-2 px-4 py-1.5 justify-center bg-white rounded-3xl">
            <Text className="text-primary-600 font-bold text-md">one</Text>
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
