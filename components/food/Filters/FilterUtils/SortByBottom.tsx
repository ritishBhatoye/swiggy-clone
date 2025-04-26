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
      <TouchableOpacity>
        <Text>Price: Low to High</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Price: High to Low</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Rating</Text>
      </TouchableOpacity>
    </ActionSheet>
  );
};
