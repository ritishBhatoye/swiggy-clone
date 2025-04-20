import { MenuCardDataType } from "@/types";
import React from "react";

import { Image, View, Text } from "react-native";

const MenuCard = ({ item }: { item: MenuCardDataType }) => {
  return (
    <View className="flex flex-col items-center gap-3">
      <Image
        source={item.image}
        className="h-44 w-44 pt-1/3"
        resizeMode="cover"
      />
      <Text className="text-sm font-bold text-gray-500">{item.title}</Text>
    </View>
  );
};

export default MenuCard;
