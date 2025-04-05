import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function Root() {
  const queryClient = new QueryClient();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Set up the auth context and render our layout inside of it.
  return (
    <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
      <QueryClientProvider client={queryClient}>
        <Slot />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
