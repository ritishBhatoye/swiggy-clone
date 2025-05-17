// import SignInScreen from "@/screens/SignIn";
import React from "react";
import { View } from "react-native";
import { SignIn } from '@clerk/clerk-expo';
const SignInScreen = () => {
  return (
    <View className="w-full">
      <SignIn />
    </View>
  );
};

export default SignInScreen;
