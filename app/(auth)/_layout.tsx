import React from "react";

import { Stack } from "expo-router";

export const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="forget-password" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
