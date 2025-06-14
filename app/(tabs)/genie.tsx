import ProfileCard from "@/components/settings/ProfileCard";
import React from "react";

import { View, Text, SafeAreaView } from "react-native";

const GenieScreen = () => {
  return (
    <SafeAreaView className="flex">
      <ProfileCard />
      <View className="">
        <Text>GenieScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default GenieScreen;
