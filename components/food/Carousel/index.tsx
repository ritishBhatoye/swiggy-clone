import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { CarouselData } from "../../../constants/dummyData/CardCarouselData";
import { CarouselCardType } from "@/types";

const { width: screenWidth } = Dimensions.get("window");

const FoodCarousel = ({
  card,
}: {
  card: (item: CarouselCardType) => JSX.Element;
}) => {
  const width = screenWidth - 32;
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
        renderItem={({ item }) => card(item)}
      />
    </View>
  );
};

export default FoodCarousel;
