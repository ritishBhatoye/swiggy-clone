import React from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  getToken: SecureStore.getItemAsync,
  saveToken: SecureStore.setItemAsync,
};

export const ClerkProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      {children}
    </ClerkProvider>
  );
};
