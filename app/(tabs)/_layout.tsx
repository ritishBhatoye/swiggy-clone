import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HapticTab } from "@/components/HapticTab";

import TabBarBackground from "@/components/ui/TabBarBackground";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#EF4F27",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Food",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "ice-cream" : "ice-cream-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dineout"
        options={{
          title: "Dineout",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "cafe" : "cafe-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="card"
        options={{
          title: "Card",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "card" : "card-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reorder"
        options={{
          headerTitle: "REORDER",
          headerTitleStyle: { fontWeight: 700, fontSize: 18 },
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          title: "Reorder",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "cart" : "cart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="genie"
        options={{
          title: "Genie",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
