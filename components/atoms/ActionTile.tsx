import React from "react";

import { View, Text } from "react-native";

const ActionTile = ({
  title,
  subTitle,
  leadingIcon,
  TrailingIcon,
}: ActionTileProps) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-1">
        {leadingIcon}
        <View className="flex flex-col items-start">
          <Text className="text-lg font-bold text-black">{title}</Text>
          <Text className="text-sm font-normal text-slate-500">{subTitle}</Text>
        </View>
      </View>
      {TrailingIcon}
    </View>
  );
};

export default ActionTile;
