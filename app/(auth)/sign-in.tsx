// import SignInScreen from "@/screens/SignIn";
import React from "react";
import { View } from "react-native";
import { SignedIn } from "@clerk/clerk-expo";
import SignIn from "@/screens/SignIn";
const SignInScreen = () => {
  return (
    <View className="w-full">
      <SignIn />
    </View>
  );
};

export default SignInScreen;
