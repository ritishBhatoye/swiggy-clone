// components/ui/TabBarBackground.tsx
import { BlurView } from "expo-blur";
import { View, Platform, StyleSheet } from "react-native";
import React from "react";

export default function TabBarBackground() {
  return (
    <View style={styles.container}>
      <BlurView
        intensity={90}
        tint={Platform.OS === "ios" ? "light" : "dark"}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
