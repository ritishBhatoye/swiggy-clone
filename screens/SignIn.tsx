"use client";

import React, { useState } from "react";
import { View, Dimensions, Text } from "react-native";
import { Image } from "expo-image";
import InputWithLabel from "@/components/atoms/InputWithLabel";

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
        <View className="rounded-t-[30px] p-8 bg-white h-full">
          <InputWithLabel
            label="Mobile "
            value={mobile}
            onChangeText={setMobile}
            placeholder=""
          />
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
