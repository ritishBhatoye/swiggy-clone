import { FilterOption } from "@/constants/dummyData/Filters";
import { FilterOptionDataType } from "@/types";
import React, { useState, forwardRef } from "react";
import { View, Text } from "react-native";
import ActionSheet from "react-native-actions-sheet"; // ✅ correct import
import RadioGroup from "react-native-radio-buttons-group";

const FilterBottomSheet = forwardRef((props, ref: any) => {
  const [selectedId, setSelectedId] = useState("lowToHigh");

  const radioButtons = [
    { id: "lowToHigh", label: "Price: Low to High", value: "lowToHigh" },
    { id: "highToLow", label: "Price: High to Low", value: "highToLow" },
    { id: "newest", label: "Newest First", value: "newest" },
    { id: "oldest", label: "Oldest First", value: "oldest" },
  ];

  // const FilterOption = [
  //   { id: 1, label: "Sort", value: "sort" },
  //   { id: 2, label: "Veg/Non-Veg", value: "veg-or-non-veg" },
  //   { id: 3, label: "Ratings", value: "ratings" },
  //   { id: 4, label: "Cost For Two", value: "costTw" },
  // ];

  return (
    <ActionSheet ref={ref}>
      <View className="flex flex-row w-full p-5 gap-5">
        <View className="flex flex-col items-start">
          {FilterOption.map((filter: FilterOptionDataType) => (
            <View className="grid grid-cols-1 items-start" key={filter.id}>
              <Text className="font-medium text-lg">{filter.label}</Text>
            </View>
          ))}
        </View>

        <View className=" grid grid-cols-1 items-start">
          <Text className="font-medium text-gray-400 text-sm mb-2">
            SORT BY
          </Text>
          {/* <View> */}
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          />
        </View>
      </View>
    </ActionSheet>
  );
});

export default FilterBottomSheet;
