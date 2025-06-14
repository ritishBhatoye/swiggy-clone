import ActionTile from "@/components/atoms/ActionTile";
import ProfileCard from "@/components/settings/ProfileCard";
import { SettingTileData } from "@/constants/dummyData/settings";
import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Profile = () => {
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
      <TouchableOpacity className="py-4 px-5 bg-white">
        <Text className="text-black text-start text-lg font-semibold">
          LOGOUT
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
