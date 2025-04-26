import React from "react";

import { TouchableOpacity, View } from "react-native";
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
      </View>
    </ActionSheet>
  );
};
