import Card from "@/components/elements/Card";
import FoodCarousel from "@/components/food/Carousel";
import TopMenuBar from "@/components/food/TopMenuBar";
import { CarouselData } from "@/constants/dummyData/CardCarouselData";
import { CarouselCardType } from "@/types";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white">
      <View className="w-11/12 mx-auto px-2">
        <TopMenuBar />
        <ScrollView>
          <FoodCarousel
            card={(food: CarouselCardType) => (
              <Card key={food.id} item={food} />
            )}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
