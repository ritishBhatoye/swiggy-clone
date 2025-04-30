// app/(auth)/_layout.tsx
import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { Image } from "expo-image";

const AuthLayout = () => {
  return (
    <View className="flex flex-col bg-primary-500 h-full">
      {/* Background Image or Top Section */}
      <Image
        contentFit="cover"
        source={require("@/assets/images/auth/auth.jpg")}
        style={{ width: "100%", height: 250 }}
      />

      <View className="w-full h-full bg-white rounded-t-[30px] py-8">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="auth-landing" />
        </Stack>
      </View>
    </View>
  );
};

export default AuthLayout;
