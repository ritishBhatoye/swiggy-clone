import { FilterDataType } from "@/types";
import React from "react";

import { View, Text } from "react-native";

export const Filter = ({ filter }: { filter: FilterDataType }) => {
  return (
    <View className="rounded-2xl p-2 border-gray-300 border">
      <Text className="text-gray-700">{filter.label}</Text>
    </View>
  );
};
