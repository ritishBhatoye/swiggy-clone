import CarouselCard from "@/src/components/elements/Cards/CarouselCard";

import FoodCarousel from "@/src/components/food/Carousel";
import CategorySection from "@/src/components/food/CategorySection";

import MenuSection from "@/src/components/food/MenuSection";
import TopMenuBar from "@/src/components/food/TopMenuBar";
import { CarouselData } from "@/constants/dummyData/CardCarouselData";

import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white">
      <View className="w-full  ">
        <View className="w-11/12 mx-auto px-2">
          <TopMenuBar />
        </View>
        <ScrollView>
          <FoodCarousel
            cardData={CarouselData}
            card={(food: CarouselCardType) => (
              <CarouselCard key={food.id} item={food} />
            )}
          />
          <View className="w-11/12 mx-auto px-2">
            <MenuSection />
          </View>
          <CategorySection />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
