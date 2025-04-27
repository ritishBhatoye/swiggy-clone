import React, { useState } from "react";
import { View, Text } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import RadioGroup from "react-native-radio-buttons-group";

export const SortByBottom = ({
  ref,
}: {
  ref: React.MutableRefObject<null>;
}) => {
  const [selectedId, setSelectedId] = useState("lowToHigh");

  const radioButtons = [
    { id: "lowToHigh", label: "Price: Low to High", value: "lowToHigh" },
    { id: "highToLow", label: "Price: High to Low", value: "highToLow" },
    { id: "newest", label: "Newest First", value: "newest" },
    { id: "oldest", label: "Oldest First", value: "oldest" },
  ];

  return (
    <ActionSheet ref={ref}>
      <View className="p-4">
        <Text className="font-medium text-gray-400 text-sm mb-2">SORT BY</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          containerStyle={{ flexDirection: "column" }}
        />
      </View>
    </ActionSheet>
  );
};
