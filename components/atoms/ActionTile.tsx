import React from "react";

import { View, Text } from "react-native";

interface props {
  ActionData: ActionTileDataType;
}

const ActionTile = ({ ActionData }: props) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-1">
        {ActionData.leadingIcon}
        <View className="flex flex-col items-start">
          <Text className="text-lg font-bold text-black">
            {ActionData.title}
          </Text>
          <Text className="text-sm font-normal text-slate-500">
            {ActionData.subTitle}
          </Text>
        </View>
      </View>
      {ActionData.TrailingIcon}
    </View>
  );
};

export default ActionTile;
