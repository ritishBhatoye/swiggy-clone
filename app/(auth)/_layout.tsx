import { Stack } from "expo-router";
import { Image } from "expo-image";
import { View } from "react-native";
import React from "react";

export default function AuthLayout() {
  return (
    <>
      <View className="absolute top-0 left-0 w-full h-[250px] bg-primary-500 z-0">
        <Image
          contentFit="cover"
          source={require("@/assets/images/auth/auth.jpg")}
          style={{ width: "100%", height: 250 }}
        />
      </View>

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 8,
            marginTop: 250,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="otp-verification" />
      </Stack>
    </>
  );
}
