import { Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HapticTab } from "@/src/components/HapticTab";

import TabBarBackground from "@/src/components/ui/TabBarBackground";
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
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          height: 70,
        },
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
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: "REORDER",
          headerTitleStyle: { fontWeight: "700", fontSize: 18 },
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
