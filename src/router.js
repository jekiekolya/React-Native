import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Redux
import { useSelector } from "react-redux";
import { authSelectors } from "./redux/auth/authSelectors";

// Navigators
import ProfileScreenNav from "./screens/mainScreens/ProfilePostsNav/ProfileScreenNav";
import PostsScreenNav from "./screens/mainScreens/PostsSceenNav/PostsScreenNav";

// Components
import RegistrationScreen from "./screens/auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen/LoginScreen";
import CreatePostsScreen from "./screens/mainScreens/CreatePostsScreen/CreatePostsScreen";

// Options for routers
import routerOptions from "./routerOptions";

// Create Navigator
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

// Auth
export const useRoute = () => {
  const isAuth = useSelector(authSelectors.getIsAuth);

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name="Registration" options={{ headerShown: false }}>
          {() => <RegistrationScreen />}
        </AuthStack.Screen>
        <AuthStack.Screen name="Login" options={{ headerShown: false }}>
          {() => <LoginScreen />}
        </AuthStack.Screen>
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{ ...routerOptions.tabBarOptions }}
    >
      <MainTab.Screen
        name="Posts"
        options={({ navigation }) => ({
          ...routerOptions.postsNavOptions(navigation),
        })}
      >
        {() => <PostsScreenNav />}
      </MainTab.Screen>
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          ...routerOptions.createPostOptions(navigation),
        })}
      />
      <MainTab.Screen
        name="Profile"
        options={({ navigation }) => ({
          ...routerOptions.profileOptions(navigation),
        })}
      >
        {() => <ProfileScreenNav />}
      </MainTab.Screen>
    </MainTab.Navigator>
  );
};
