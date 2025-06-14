import React from "react";

import { View, Text } from "react-native";

interface props {
  actionData: ActionTileDataType;
}

const ActionTile = ({ actionData }: props) => {
  const LeadingIconComponent = actionData.leadingIcon?.type;
  const TrailingIconComponent = actionData.TrailingIcon?.type;

  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-1">
        {actionData.leadingIcon && LeadingIconComponent && (
          <LeadingIconComponent
            name={actionData.leadingIcon.name}
            size={actionData.leadingIcon.size}
            color={actionData.leadingIcon.color}
          />
        )}
        <View className="flex flex-col items-start">
          <Text className="text-lg font-bold text-black">
            {actionData.title}
          </Text>
          <Text className="text-sm font-normal text-slate-500">
            {actionData.subTitle}
          </Text>
        </View>
      </View>
      {actionData.TrailingIcon && TrailingIconComponent && (
        <TrailingIconComponent
          name={actionData.TrailingIcon.name}
          size={actionData.TrailingIcon.size}
          color={actionData.TrailingIcon.color}
        />
      )}
    </View>
  );
};

export default ActionTile;
