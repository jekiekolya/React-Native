import { useCallback } from "react";
import { ActivityIndicator, View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../../router";

// Styles
import styles from "./Main.Styled";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Main() {
  // Auth
  const routing = useRoute();

  // Upload all fonts
  const [fontsLoaded] = useFonts({
    "Roboto-Regulat": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
}
