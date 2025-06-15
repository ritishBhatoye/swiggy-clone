import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface props {
  restaurant: RestaurantCardDataType;
}

const RestaurantCard = ({ restaurant }: props) => {
  return (
    <TouchableOpacity className="rounded-xl border-[0.4px] border-gray-400 ">
      <Image
        className="w-full"
        source={{ uri: restaurant.image }}
        contentFit="fill"
        style={{
          width: "100%",
          height: 240,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <LinearGradient
        colors={["#FFF7F0", "#FFB476"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        style={{ flex: 1, borderRadius: 12 }}
      >
        <View className="gap-1.5 px-5 py-2">
          <View className="items-center justify-between flex-row">
            <Text className="text-2xl font-extrabold">{restaurant.name}</Text>
            <View className="gap-1 flex-row items-center">
              <Ionicons
                name="star"
                size={13}
                color={"white"}
                className="p-1 bg-green-700 rounded-full"
              />
              <Text className="text-lg font-semibold">{restaurant.rating}</Text>
            </View>
          </View>
          <Text className="text-gray-400 text-sm font-light">
            {restaurant.location}
          </Text>
          <Text className="text-gray-400 text-sm font-light">
            {restaurant.popularDish}
          </Text>
          <View className="border-b-[0.3px]" />
          {restaurant.offers.map((offer: string, id: number) => (
            <View className="flex-row gap-2 items-center" key={id}>
              <Ionicons
                name={id == 1 ? "star" : "pricetag-outline"}
                color={"#EF4F27"}
                size={20}
              />
              <Text className="text-gray-400 text-sm font-light">{offer}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
