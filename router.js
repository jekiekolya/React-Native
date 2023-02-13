import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Navigators
import ProfileScreenNav from "./helpers/navigators/ProfileScreenNav";

// Components
import RegistrationScreen from "./screens/auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen/LoginScreen";
import PostsScreen from "./screens/mainScreens/PostsScreen/PostsScreen";
import CreatePostsScreen from "./screens/mainScreens/CreatePostsScreen/CreatePostsScreen";

// Options for routers
import routerOptions from "./helpers/routerOptions";

// Create Navigator
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

// Auth
export const useRoute = () => {
  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name="Registration" options={{ headerShown: false }}>
          {() => <RegistrationScreen setIsAuth={setIsAuth} />}
        </AuthStack.Screen>
        <AuthStack.Screen name="Login" options={{ headerShown: false }}>
          {() => <LoginScreen setIsAuth={setIsAuth} />}
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
        component={PostsScreen}
        options={{ ...routerOptions.postsOptions(setIsAuth) }}
      />
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
        {() => <ProfileScreenNav setIsAuth={setIsAuth} />}
      </MainTab.Screen>
    </MainTab.Navigator>
  );
};
