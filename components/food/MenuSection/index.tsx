import MenuCard from "@/components/elements/Cards/MenuCard";
import { TitleWithBar } from "@/components/elements/TitleWithBar";
import { MenuData } from "@/constants/dummyData/MenuData";
import { MenuCardDataType } from "@/types";
import React from "react";
import { ScrollView, View } from "react-native";

const MenuSection = () => {
  // Only take 20 items max for this layout (optional safety)
  const visibleItems = MenuData.slice(0, 20);

  // Break into two rows
  const row1 = visibleItems.slice(0, 10);
  const row2 = visibleItems.slice(10, 20);

  return (
    <View className="w-full flex flex-col items-start">
      <TitleWithBar title={"RITISH, WHAT'S ON YOUR MIND"} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-2"
      >
        <View className="flex-row gap-x-3">
          {row1.map((_, i) => (
            <View key={i} className="flex-col gap-y-2">
              <MenuCard item={row1[i]} />
              {row2[i] && <MenuCard item={row2[i]} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuSection;
