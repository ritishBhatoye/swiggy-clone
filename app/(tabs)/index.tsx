import TopMenuBar from "@/components/food/TopMenuBar";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white">
      <View className="w-11/12 mx-auto px-2">
        <TopMenuBar />
        <ScrollView></ScrollView>
      </View>
    </SafeAreaView>
  );
}
