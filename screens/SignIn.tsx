"use client";

import React, { useState } from "react";
import { View, Dimensions, Text } from "react-native";
import { Image } from "expo-image";
import InputWithLabel from "@/components/atoms/InputWithLabel";
import Button from "@/components/atoms/Button";
import { ListTile } from "@/components/elements/ListTile";

const { width: screenWidth } = Dimensions.get("window");

const SignInScreen = () => {
  const [mobile, setMobile] = useState("");
  return (
    <View className="flex flex-col items-start bg-primary-500 h-full">
      <Image
        resizeMode="cover"
        source={require("@/assets/images/auth/auth.jpg")}
        style={{ width: screenWidth, height: 250 }}
      />
      <View className="w-full h-full  bg-primary-500">
        <View className="rounded-t-[30px] py-8 bg-white h-full">
          <View className="flex flex-col items-center w-11/12 mx-auto gap-1">
            <Text className="text-2xl text-black font-semibold text-start w-full">
              ACCOUNT
            </Text>
            <Text className="text-base text-gray-400 font-medium w-full">
              Login/Create Account to manage order
            </Text>

            <Button
              title={"LOGIN"}
              textClassName="px-12 "
              className="rounded-sm my-2 py-4 mt-3 w-full"
            />
            <Text className="w-full text-sm  font-medium text-gray-400">
              By clicking, I accept the{" "}
              <Text className="text-black font-semibold">
                Terms & Conditions & Privacy
              </Text>
            </Text>
            <ListTile title={""} leading={""} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
