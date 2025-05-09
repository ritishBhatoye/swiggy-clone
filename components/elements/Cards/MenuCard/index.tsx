import { MenuCardDataType } from "@/types";
import React from "react";

import { Image, View, Text, TouchableOpacity } from "react-native";

const MenuCard = ({ item }: { item: MenuCardDataType }) => {
  return (
    <TouchableOpacity>
      <View className="flex flex-col items-center gap-5 py-3">
        <View style={{ backgroundColor: "transparent" }}>
          <Image
            source={item.image}
            className="h-24 w-24 pt-1/3"
            resizeMode="contain"
            style={{
              tintColor: undefined,
              opacity: 1,
            }}
          />
        </View>
        <Text className="text-sm font-bold text-gray-500">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuCard;
