import React from "react";

import { TouchableOpacity, View, Text } from "react-native";
import ActionSheet from "react-native-actions-sheet";

export const SortByBottom = ({
  ref,
}: {
  ref: React.MutableRefObject<null>;
}) => {
  return (
    <ActionSheet ref={ref}>
      <View className="grid grid-cols-2">
        <View></View>
        <View className="flex flex-col items-start">
          <Text className="font-medium text-gray-400 text-sm">SORT BY</Text>
          <View></View>
        </View>
      </View>
    </ActionSheet>
  );
};
