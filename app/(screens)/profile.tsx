import ActionTile from "@/components/atoms/ActionTile";
import ProfileCard from "@/components/settings/ProfileCard";
import { SettingTileData } from "@/constants/dummyData/settings";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1">
      <ProfileCard />
      <ScrollView>
        <FlatList
          contentContainerClassName="px-5 gap-4  bg-white"
          keyExtractor={(item) => item.id.toString()}
          data={SettingTileData}
          renderItem={({ item }: { item: any }) => (
            <View className="border-b-[0.2px] py-5">
              <ActionTile actionData={item} />
            </View>
          )}
        />
        <TouchableOpacity className="py-4 px-5 bg-white flex flex-row justify-between my-4">
          <Text className="text-black text-start text-lg font-semibold">
            LOGOUT
          </Text>
          <Ionicons name="chevron-forward-outline" color={"black"} size={24} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
