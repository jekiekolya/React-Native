import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

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
  const [isAuth, setIsAuth] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // setIsAuth(true)
      const uid = user.uid;
      console.log(uid);
    } else {
      // User is signed out
      // ...
    }
  });

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
        options={({ navigation }) => ({
          ...routerOptions.postsNavOptions(navigation),
        })}
      >
        {() => <PostsScreenNav setIsAuth={setIsAuth} />}
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
        {() => <ProfileScreenNav setIsAuth={setIsAuth} />}
      </MainTab.Screen>
    </MainTab.Navigator>
  );
};
