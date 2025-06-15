import { CategoryCard } from "@/src/components/elements/Cards/CategoryCard";
import { CategoryDummyData } from "@/constants/dummyData/CategoryData";
import React from "react";

import { View, Text } from "react-native";
import Filters from "../../elements/Filters";

const CategorySection = () => {
  return (
    <View className="flex flex-col items-start gap-6 py-4">
      <Text className="text-gray-400 font-bold text-sm w-11/12 mx-auto">
        {" "}
        Top 893 restaurants to explore
      </Text>
      <Filters />
      <View className="w-11/12 mx-auto flex flex-col items-start gap-6">
        {CategoryDummyData.map((categoryItem) => (
          <CategoryCard key={categoryItem.id} category={categoryItem} />
        ))}
      </View>
    </View>
  );
};

export default CategorySection;
