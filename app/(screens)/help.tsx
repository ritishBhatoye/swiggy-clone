import { Assistant } from "@/components/global/HelpAssistant";
import React from "react";
import { SafeAreaView } from "react-native";

const help = () => {
  return (
    <SafeAreaView className="flex-1 ">
      <Assistant />
    </SafeAreaView>
  );
};

export default help;
