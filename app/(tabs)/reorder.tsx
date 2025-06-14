import SearchInputField from "@/components/food/TopMenuBar/SearchInputField";
import React from "react";

import { View, Text, SafeAreaView } from "react-native";

const ReorderScreen = () => {
  return (
    <SafeAreaView>
      <View className="bg-white p-5">
        <SearchInputField
          isLeadingIcon={false}
          fieldText="Search by restaurant or dish"
          icon={"search"}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReorderScreen;
