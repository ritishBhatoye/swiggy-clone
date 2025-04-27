import { FilterOption } from "@/constants/dummyData/Filters";
import { FilterOptionDataType, SortDataType } from "@/types";
import React, { useState, forwardRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

const FilterBottomSheet = forwardRef((props, ref: any) => {
  const [filterOption, setFilterOption] = useState(FilterOption[0].id);
  const selectedFilterOption = FilterOption.find((f) => f.id === filterOption);
  const [selectedId, setSelectedId] = useState(
    selectedFilterOption?.options?.[0]?.id || ""
  );

  return (
    <ActionSheet ref={ref} closable>
      <View className="flex flex-row w-full p-5 gap-5">
        <View className="flex flex-col items-start">
          {FilterOption.map((filter: FilterOptionDataType) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => {
                setFilterOption(filter.id);
              }}
            >
              <View className={`flex flex-row  items-center gap-5 `}>
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
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex flex-col items-start">
          <Text className="font-semibold text-gray-600 text-sm mb-2">
            SORT BY
          </Text>
          {selectedFilterOption?.options && (
            <RadioGroup
              radioButtons={selectedFilterOption.options}
              onPress={setSelectedId}
              selectedId={selectedId}
              containerStyle={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            />
          )}
        </View>
      </View>
    </ActionSheet>
  );
});

export default FilterBottomSheet;
