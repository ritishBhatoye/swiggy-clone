import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface FilterItem {
  id: string | number;
  label: string;
}

interface RoundedFiltersProps {
  items: FilterItem[];
  selectedCategory: string;
  onCategoryPress: (label: string, id: string | number) => void;
}

const RoundedFilters: React.FC<RoundedFiltersProps> = ({
  items,
  selectedCategory,
  onCategoryPress,
}) => {
  return (
    <>
      {items.map((item) => (
        <TouchableOpacity
          onPress={() => onCategoryPress(item.label, item.id)}
          className={`px-4 py-2 rounded-full mr-4 ${
            selectedCategory === item.label
              ? "bg-gray-100"
              : "bg-gray-100 border border-gray-300"
          }`}
          key={item.id}
        >
          <Text
            className={`text-sm ${
              selectedCategory === item.label
                ? "text-gray-600 font-rubik-bold mt-0.5"
                : "text-black-300 font-rubik"
            }`}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default RoundedFilters;
