import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ProfileCard = () => {
  return (
    <View className="flex flex-col items-start bg-red-900 p-5 py-10 gap-4">
      <Text className="text-2xl font-bold text-white">RITISH</Text>
      <Text className="text-lg font-thin text-white">
        +91 7042421344 . ritish@gmail.com
      </Text>
      <TouchableOpacity className="flex-row items-center gap-2">
        <Text className="text-md font-medium text-white">Edit Profile</Text>
        <Ionicons name="chevron-forward-outline" color={"white"} size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;
