import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import RegistrationScreen from "./screens/auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen/LoginScreen";
import PostsScreen from "./screens/mainScreens/PostsScreen/PostsScreen";
import CreatePostsScreen from "./screens/mainScreens/CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreens/ProfileScreen/ProfileScreen";

// Options for routers
import routerOptions from "./helpers/routerOptions";

// Create Navigator
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

// Auth
export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
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
        options={{
          ...routerOptions.postsOptions,
        }}
      />
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          ...routerOptions.createPostOptions,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          ...routerOptions.profileOptions,
        }}
      />
    </MainTab.Navigator>
  );
};
