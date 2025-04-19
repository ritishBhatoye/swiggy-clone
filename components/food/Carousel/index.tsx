import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { CarouselData } from "../../../constants/dummyData/CardCarouselData";

const { width: screenWidth } = Dimensions.get("window");

const FoodCarousel = () => {
  const width = screenWidth - 32; // Accounting for horizontal padding

  return (
    <View className="px-4 py-5">
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={CarouselData}
        scrollAnimationDuration={1000}
        autoPlayInterval={4000}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 mx-1 rounded-xl overflow-hidden bg-white shadow-lg"
            activeOpacity={0.9}
            onPress={() => {
              console.log("Selected:", item.shopName);
            }}
          >
            <View className="flex-row h-full">
              {/* Left side - Image */}
              <View className="w-1/2 relative">
                <Image
                  source={{ uri: item.itemImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {/* Offer Badge */}
                <View className="absolute top-2 left-2">
                  <View className="bg-red-500 px-2 py-1 rounded">
                    <Text className="text-white font-bold text-xs">
                      {item.offer}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Right side - Content */}
              <View className="w-1/2 p-3 justify-between">
                <View className="space-y-1">
                  <Text
                    className="text-base font-bold text-gray-800 leading-tight"
                    numberOfLines={1}
                  >
                    {item.shopName}
                  </Text>
                  <Text className="text-sm text-gray-600" numberOfLines={2}>
                    {item.itemName}
                  </Text>
                </View>

                <View className="space-y-2">
                  {/* Rating */}
                  <View className="flex-row items-center space-x-1">
                    <View className="bg-green-500 px-2 py-0.5 rounded">
                      <Text className="text-white font-bold text-xs">
                        ★ {item.rating}
                      </Text>
                    </View>
                  </View>

                  {/* Delivery Time */}
                  <Text className="text-xs text-gray-500">
                    {item.deliveryTime}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FoodCarousel;
