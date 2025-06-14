import ActionTile from "@/components/atoms/ActionTile";
import ProfileCard from "@/components/settings/ProfileCard";
import { SettingTileData } from "@/constants/dummyData/settings";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "expo-router";

const Profile = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > 130) {
        navigation.setOptions({ headerTitle: "My Account" });
      } else {
        navigation.setOptions({ headerTitle: "" });
      }
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <ProfileCard />

        <View className="px-5 bg-white">
          {SettingTileData.map((item, index) => (
            <View
              key={item.id}
              className={`${
                index === SettingTileData.length - 1 ? "" : "border-b-[0.2px]"
              } py-5`}
            >
              <ActionTile actionData={item} />
            </View>
          ))}
        </View>

        <TouchableOpacity className="p-5 bg-white flex flex-row justify-between my-4">
          <Text className="text-black text-start text-lg font-semibold">
            LOGOUT
          </Text>
          <Ionicons name="chevron-forward-outline" color={"black"} size={24} />
        </TouchableOpacity>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
