import ActionTile from "@/components/atoms/ActionTile";
import ProfileCard from "@/components/settings/ProfileCard";
import { SettingTileData } from "@/constants/dummyData/settings";
import React from "react";

import { View, Text, SafeAreaView, FlatList } from "react-native";

const GenieScreen = () => {
  return (
    <SafeAreaView className="flex">
      <ProfileCard />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={SettingTileData}
        renderItem={({ item }: { item: any }) => (
          <ActionTile actionData={item} />
        )}
      />
    </SafeAreaView>
  );
};

export default GenieScreen;
