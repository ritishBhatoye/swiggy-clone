import { CategoryCard } from "@/components/elements/Cards/CategoryCard";
import { CategoryDummyData } from "@/constants/dummyData/CategoryData";
import React from "react";

import { View } from "react-native";
import Filters from "../Filters";

const CategorySection = () => {
  return (
    <View className="flex flex-col items-start gap-5">
      <Filters />
      <View className="w-11/12 mx-auto flex flex-col items-start gap-2">
        {CategoryDummyData.map((categoryItem) => (
          <CategoryCard key={categoryItem.id} category={categoryItem} />
        ))}
      </View>
    </View>
  );
};

export default CategorySection;
