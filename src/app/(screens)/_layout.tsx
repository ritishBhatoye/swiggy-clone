import { Ionicons } from "@expo/vector-icons";
import { Router, Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

const ScreensLayout = () => {
  const router: Router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          headerStyle: { backgroundColor: "#7f1d1d" },
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleAlign: "left",
          headerTintColor: "white",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back-outline" color={"white"} size={20} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/(screens)/help")}
              className="p-1 px-2 rounded-2xl bg-black/40 "
            >
              <Text className="text-white text-sm">Help</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default ScreensLayout;
