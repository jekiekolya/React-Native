import { useCallback } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import RegistrationScreen from "./screens/auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen/LoginScreen";
import HomeScreen from "./screens/mainScreens/PostsScreen/PostsScreen";

// Options for headers
import headerOptions from "./helpers/headerOptions";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Create Navigator
const AuthStack = createStackNavigator();

export default function App() {
  // Upload all fonts
  const [fontsLoaded] = useFonts({
    "Roboto-Regulat": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
            <AuthStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <AuthStack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                ...headerOptions.homeHeaderOptions,
              }}
            />
          </AuthStack.Navigator>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "regular",
  },
  loader: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
