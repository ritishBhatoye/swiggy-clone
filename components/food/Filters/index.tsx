import { Filter } from "@/components/elements/Filter";
import { FiltersOptionsData } from "@/constants/dummyData/Filters";
import { FilterDataType } from "@/types";
import React from "react";

import { View } from "react-native";

export default function Filters() {
  return (
    <View className="w-full">
      {FiltersOptionsData.map((filter: FilterDataType) => (
        <Filter key={filter.id} filter={filter} />
      ))}
    </View>
  );
}
