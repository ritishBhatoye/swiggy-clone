import ProfileCard from "@/components/settings/ProfileCard";
import React from "react";

import { View, Text, SafeAreaView, FlatList } from "react-native";

const GenieScreen = () => {
  return (
    <SafeAreaView className="flex">
      <ProfileCard />
      <FlatList data={undefined} renderItem={undefined} />
    </SafeAreaView>
  );
};

export default GenieScreen;
