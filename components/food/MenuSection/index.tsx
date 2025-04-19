import MenuCard from "@/components/elements/Cards/MenuCard";
import { MenuData } from "@/constants/dummyData/MenuData";
import { MenuCardDataType } from "@/types";
import React from "react";

import { FlatList, View } from "react-native";

const MenuSection = () => {
  return (
    <View className="w-full">
      <FlatList
        horizontal
        data={MenuData}
        renderItem={({ item }: { item: MenuCardDataType }) => (
          <View className="grid grid-cols-4 gap-4 w-full">
            <MenuCard item={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default MenuSection;
