import React from "react";

import { View, Text } from "react-native";

interface ActionTileProps {
  leadingIcon?: React.ReactNode;
  title: string;
  subTitle: string;
  TrailingIcon?: React.ReactNode;
}

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
          <Text className="text-lg font-bold">{title}</Text>
          <Text className="text-sm font-normal">{subTitle}</Text>
        </View>
      </View>
      {TrailingIcon}
    </View>
  );
};

export default ActionTile;
