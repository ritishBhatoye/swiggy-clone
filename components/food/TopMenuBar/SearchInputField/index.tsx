import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { View, Text } from "react-native";

const SearchInputField = () => {
  return (
    <View className="flex flex-row border w-full border-gray-400 rounded-3xl gap-4 p-3 py-5 items-center justify-between">
      <View className="gap-2 px-2 flex flex-row items-center border-r w-11/12 border-gray-400 ">
        <Ionicons name="search" size={20} color={"#9ca3af"} className="" />
        <Text className="text-md text-gray-400">Search for 'Sweets'</Text>
      </View>
      <Ionicons name="mic" size={20} color={"#FC8019"} />
    </View>
  );
};

export default SearchInputField;
