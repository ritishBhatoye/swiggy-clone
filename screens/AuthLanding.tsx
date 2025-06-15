"use client";

import React from "react";
import { View, Dimensions, Text } from "react-native";

import Button from "@/src/components/atoms/Button";
import { ListTile } from "@/src/components/elements/ListTile";
import { Router, useRouter } from "expo-router";

const AuthLandingScreen = () => {
  const router: Router = useRouter();
  return (
    <View className="bg-white h-full w-full">
      <View className="flex flex-col items-center w-11/12 mx-auto gap-4">
        <Text className="text-2xl text-black font-semibold text-start w-full">
          ACCOUNT
        </Text>
        <Text className="text-base text-gray-400 font-medium w-full">
          Login/Create Account to manage order
        </Text>
        <Button
          onPress={() => {
            router.push("/(auth)/sign-in");
          }}
          title={"LOGIN"}
          textClassName="px-12 "
          className="rounded-sm  py-4 mt-3 w-full"
        />
        <Button
          onPress={() => {
            router.push("/(auth)/sign-up");
          }}
          title={"Create Account"}
          textClassName="px-12"
          className="rounded-sm my-2 py-4 w-full"
        />{" "}
        <Button
          onPress={() => {
            router.push("/(tabs)");
          }}
          title={"Discover"}
          textClassName="px-12"
          className="rounded-sm my-2 py-4 w-full"
        />
        <Text className="w-full text-sm  font-medium text-gray-400">
          By clicking, I accept the{" "}
          <Text className="text-black font-semibold">
            Terms & Conditions & Privacy
          </Text>
        </Text>
        <View className="my-5 shadow-none border-b border-black w-full" />
        <ListTile
          className="border rounded-none border-dashed border-gray-500"
          title={"Send Feedback"}
          leading={"mail-outline"}
          color=" #6b7280"
        />
        <ListTile
          className="border my-3 rounded-none  border-dashed border-gray-500"
          title={"Send Feedback"}
          leading={"mail-outline"}
          color=" #6b7280"
        />
      </View>
    </View>
  );
};

export default AuthLandingScreen;
