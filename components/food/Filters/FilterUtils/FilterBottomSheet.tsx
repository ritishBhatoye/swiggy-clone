import { FilterOption } from "@/constants/dummyData/Filters";
import { FilterOptionDataType } from "@/types";
import React, { useState, forwardRef } from "react";
import { View, Text } from "react-native";
import ActionSheet from "react-native-actions-sheet"; // ✅ correct import
import RadioGroup from "react-native-radio-buttons-group";

const FilterBottomSheet = forwardRef((props, ref: any) => {
  const [selectedId, setSelectedId] = useState("lowToHigh");
  const [filterOption, setFilterOption] = useState(FilterOption[0].id);
  const radioButtons = [
    { id: "lowToHigh", label: "Price: Low to High", value: "lowToHigh" },
    { id: "highToLow", label: "Price: High to Low", value: "highToLow" },
    { id: "newest", label: "Newest First", value: "newest" },
    { id: "oldest", label: "Oldest First", value: "oldest" },
  ];

  return (
    <ActionSheet ref={ref} closable>
      <View className="flex flex-row w-full p-5 gap-5">
        <View className="flex flex-col items-start">
          {FilterOption.map((filter: FilterOptionDataType) => (
            <View
              className={`flex flex-row  items-center gap-5 `}
              key={filter.id}
            >
              <Text
                className={`py-5 ${
                  filterOption == filter.id
                    ? "border-r-8  border-r-primary-500 rounded-r-lg"
                    : ""
                }`}
              ></Text>
              <Text
                className={`font-bold text-lg ${
                  filterOption == filter.id
                    ? "text-primary-500"
                    : "text-gray-600"
                }`}
              >
                {filter.label}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex flex-col items-start">
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
