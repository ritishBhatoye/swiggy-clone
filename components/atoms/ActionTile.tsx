import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

interface props {
  actionData: ActionTileDataType;
}

const ActionTile = ({ actionData }: props) => {
  const LeadingIconComponent = actionData.leadingIcon?.type;
  const TrailingIconComponent = actionData.trailingIcon?.type;

  return (
    <TouchableOpacity className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-1">
        {actionData.leadingIcon && LeadingIconComponent && (
          <LeadingIconComponent
            name={actionData.leadingIcon.name}
            size={actionData.leadingIcon.size}
            color={actionData.leadingIcon.color}
          />
        )}
        <View className="flex flex-col items-start gap-2">
          <Text className="text-lg font-bold text-black">
            {actionData.title}
          </Text>
          <Text className="text-sm font-normal text-slate-500">
            {actionData.subTitle}
          </Text>
        </View>
      </View>
      {actionData.trailingIcon && TrailingIconComponent && (
        <TrailingIconComponent
          name={actionData.trailingIcon.name}
          size={actionData.trailingIcon.size}
          color={actionData.trailingIcon.color}
        />
      )}
    </TouchableOpacity>
  );
};

export default ActionTile;
