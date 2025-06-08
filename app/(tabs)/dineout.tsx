import TopMenuBar from "@/components/food/TopMenuBar";
import React from "react";

import { SafeAreaView, View } from "react-native";

const DineoutScreen = () => {
  return (
    <SafeAreaView className="bg-white h-full  ">
      <View className="w-11/12 mx-auto px-2">
        <TopMenuBar />
      </View>
    </SafeAreaView>
  );
};

export default DineoutScreen;
