import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

const ProfileCard = () => {
  return (
    <View className="flex flex-col items-start bg-red-950 p-5">
      <Text className="text-lg font-bold">RITISH</Text>
      <Text className="text-md font-thin ">
        +91 7042421344 . ritish@gmail.com
      </Text>
      <View className="flex-row items-center gap-1.4">
        <Text className="text-md font-medium">Edit Profile</Text>
        <Ionicons name="chevron-forward-outline" color={"white"} size={10} />
      </View>
    </View>
  );
};

export default ProfileCard;
