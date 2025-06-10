import RestaurantCard from "@/components/elements/Cards/RestaurantCard";
import TopMenuBar from "@/components/food/TopMenuBar";
import { restaurantData } from "@/constants/dummyData/RestaurantData";
import React from "react";

import { FlatList, SafeAreaView, View } from "react-native";

const DineoutScreen = () => {
  return (
    <SafeAreaView className="bg-white h-full  ">
      <View className="w-11/12 mx-auto px-2">
        <TopMenuBar />
      </View>
      <FlatList
        data={restaurantData}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
      />
    </SafeAreaView>
  );
};

export default DineoutScreen;
