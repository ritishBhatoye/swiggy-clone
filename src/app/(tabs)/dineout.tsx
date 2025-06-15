import RestaurantCard from "@/src/components/elements/Cards/RestaurantCard";
import TopMenuBar from "@/src/components/food/TopMenuBar";
import { restaurantData } from "@/constants/dummyData/RestaurantData";
import React from "react";

import { FlatList, SafeAreaView, View } from "react-native";

const DineoutScreen = () => {
  return (
    <SafeAreaView className="bg-white h-full  ">
      <View className="w-11/12 mx-auto px-2 py-3 bg-white">
        <TopMenuBar />
      </View>
      <FlatList
        data={restaurantData}
        contentContainerClassName="px-4 gap-10"
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
      />
    </SafeAreaView>
  );
};

export default DineoutScreen;
