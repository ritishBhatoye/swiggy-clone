import React from "react";

import { View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { CarouselCardType } from "@/types";

// const { width: screenWidth } = Dimensions.get("window");

const FoodCarousel = ({
  card,
  cardData,
}: {
  card: (item: CarouselCardType) => JSX.Element;
  cardData: CarouselCardType[];
}) => {
  //   const width = screenWidth - 32;
  const screenWidth = Dimensions.get("window").width;
  const carouselWidth = (11 / 12) * screenWidth;
  return (
    <View className="w-full py-5 ">
      <Carousel
        loop
        style={{ marginHorizontal: "auto" }}
        width={carouselWidth}
        height={200}
        autoPlay={true}
        data={cardData}
        scrollAnimationDuration={1000}
        autoPlayInterval={4000}
        renderItem={({ item }) => card(item)}
      />
    </View>
  );
};

export default FoodCarousel;
