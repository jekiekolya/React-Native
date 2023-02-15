import { createStackNavigator } from "@react-navigation/stack";

// Components
import PostsScreen from "../../nestedScreens/PostsScreen/PostsScreen";
import CommentScreen from "../../nestedScreens/CommentsScreen/CommentsScreen";
import MapScreen from "../../nestedScreens/MapScreen/MapScreen";

// Options
import routerOptions from "../../../routerOptions";

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
