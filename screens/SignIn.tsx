import React from "react";
import { View, Dimensions, Text } from "react-native";
import { Image } from "expo-image";

const { width: screenWidth } = Dimensions.get("window");

const SignInScreen = () => {
  return (
    <View className="flex flex-col items-start bg-primary-500 h-full">
      <Image
        resizeMode="cover"
        source={require("@/assets/images/auth/auth.jpg")}
        style={{ width: screenWidth, height: 250 }}
      />
      <View className="w-full h-full bg-primary-500">
        <Text>Hi</Text>
      </View>
    </View>
  );
};

export default SignInScreen;
