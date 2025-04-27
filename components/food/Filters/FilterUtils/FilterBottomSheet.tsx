import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

export const SortByBottom = ({
  ref,
}: {
  ref: React.MutableRefObject<null>;
}) => {
  const [selected, setSelected] = React.useState("");

  return (
    <ActionSheet ref={ref}>
      <View className="flex flex-col items-start p-4">
        <Text className="font-medium text-gray-400 text-sm mb-4">SORT BY</Text>
        <RadioButtonGroup
          selected={selected}
          onSelected={(value) => setSelected(value)}
          radioBackground="black"
        >
          <RadioButtonItem value="Option 1" label="Option 1" />
          <RadioButtonItem value="Option 2" label="Option 2" />
          <RadioButtonItem value="Option 3" label="Option 3" />
        </RadioButtonGroup>
      </View>
    </ActionSheet>
  );
};
