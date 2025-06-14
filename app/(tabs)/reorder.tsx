import SearchInputField from "@/components/food/TopMenuBar/SearchInputField";
import React from "react";

import { View, Text, SafeAreaView, ScrollView } from "react-native";

const ReorderScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-white p-5">
          <SearchInputField
            isLeadingIcon={false}
            fieldText="Search by restaurant or dish"
            icon={"search"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReorderScreen;
