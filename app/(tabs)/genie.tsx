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
        contentContainerClassName="px-5 gap-4"
        keyExtractor={(item) => item.id.toString()}
        data={SettingTileData}
        renderItem={({ item }: { item: any }) => (
          <View className="border-b-[0.2px] py-5">
            <ActionTile actionData={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default GenieScreen;
