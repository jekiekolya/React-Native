import { createStackNavigator } from "@react-navigation/stack";

// Components
import PostsScreen from "../../screens/mainScreens/PostsScreen/PostsScreen";
import CommentScreen from "../../screens/mainScreens/CommentsScreen/CommentsScreen";
import MapScreen from "../../screens/mainScreens/MapScreen/MapScreen";

// Options
import routerOptions from "../routerOptions";

const PostsNav = createStackNavigator();

const PostsScreenNav = ({ setIsAuth }) => {
  return (
    <PostsNav.Navigator initialRouteName="PostsNav">
      <PostsNav.Screen
        name="PostsNav"
        options={() => ({
          ...routerOptions.postsOptions(setIsAuth),
        })}
      >
        {() => <PostsScreen />}
      </PostsNav.Screen>
      <PostsNav.Screen
        name="CommentNav"
        component={CommentScreen}
        options={({ navigation }) => ({
          ...routerOptions.commentsOptions(navigation),
        })}
      />
      <PostsNav.Screen
        name="MapNav"
        component={MapScreen}
        options={({ navigation }) => ({
          ...routerOptions.mapOptions(navigation),
        })}
      />
    </PostsNav.Navigator>
  );
};
export default PostsScreenNav;
