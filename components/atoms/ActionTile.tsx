import React from "react";

import { View, Text } from "react-native";

interface props {
  actionData: ActionTileDataType;
}

const ActionTile = ({ actionData }: props) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-1">
        {actionData.leadingIcon}
        <View className="flex flex-col items-start">
          <Text className="text-lg font-bold text-black">
            {actionData.title}
          </Text>
          <Text className="text-sm font-normal text-slate-500">
            {actionData.subTitle}
          </Text>
        </View>
      </View>
      {actionData.TrailingIcon}
    </View>
  );
};

export default ActionTile;
