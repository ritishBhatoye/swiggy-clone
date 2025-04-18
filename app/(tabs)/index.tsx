import TopMenuBar from "@/components/food/TopMenuBar";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="w-full">
        <TopMenuBar />
        <ScrollView></ScrollView>
      </View>
    </SafeAreaView>
  );
}
