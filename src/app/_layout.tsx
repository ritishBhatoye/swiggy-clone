import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { LogBox } from "react-native";
import { ClerkProviderWrapper } from "@/src/components/elements/ClerkProviderWrapper";
import { Provider } from "react-redux";
import { store } from "../store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      // You can load fonts, API, data here if needed
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 👈 Keep splash for 3 seconds
      await SplashScreen.hideAsync(); // 👈 Now hide it
    }

    prepare();
  }, []);
  return (
    <Provider store={store}>
      <ClerkProviderWrapper>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack initialRouteName="(auth)">
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ClerkProviderWrapper>
    </Provider>
  );
}
