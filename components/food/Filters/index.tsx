import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

import { FiltersOptionsData } from "@/constants/dummyData/Filters";
import { FilterOptionsDataType } from "@/types";

import FilterBottomSheet from "./FilterUtils/FilterBottomSheet";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );
  const actionSheetRef = useRef(null);

  const handleCategoryPress = (category: string, id: number) => {
    if (id === 1) {
      actionSheetRef.current?.show();
      return;
    }

    if (selectedCategory == category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <>
      <FilterBottomSheet ref={actionSheetRef} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex flex-row px-4 ml-[2%]"
      >
        {FiltersOptionsData.map((item: FilterOptionsDataType) => (
          <TouchableOpacity
            onPress={() => handleCategoryPress(item.label, item.id)}
            className={`px-4 py-2 rounded-full  mr-4 ${
              selectedCategory == item.label
                ? "bg-gray-100"
                : "bg-gray-100 border border-gray-300"
            }`}
            key={item.id}
          >
            <Text
              className={`text-sm ${
                selectedCategory == item.label
                  ? "text-gray-600 font-rubik-bold mt-0.5"
                  : "text-black-300 font-rubik"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default Filters;
