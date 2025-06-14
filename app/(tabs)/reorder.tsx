import ReorderCard from "@/components/elements/Cards/ReorderCard";
import SearchInputField from "@/components/food/TopMenuBar/SearchInputField";
import { reorderData } from "@/constants/dummyData/reorder";
import React from "react";

import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";

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
        <FlatList
          data={reorderData}
          contentContainerClassName="px-5 gap-5 mt-5"
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => <ReorderCard items={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReorderScreen;
