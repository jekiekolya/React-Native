import { createStackNavigator } from "@react-navigation/stack";

// Components
import ProfileScreen from "../../nestedScreens/ProfileScreen/ProfileScreen";
import CommentScreen from "../../nestedScreens/CommentsScreen/CommentsScreen";
import MapScreen from "../../nestedScreens/MapScreen/MapScreen";

// Options
import routerOptions from "../../../routerOptions";

const ProfileNav = createStackNavigator();

const ProfileScreenNav = ({ setIsAuth }) => {
  return (
    <ProfileNav.Navigator initialRouteName="ProfileNav">
      <ProfileNav.Screen
        name="ProfileNav"
        options={() => ({
          ...routerOptions.profileOptions(),
        })}
      >
        {() => <ProfileScreen setIsAuth={setIsAuth} />}
      </ProfileNav.Screen>
      <ProfileNav.Screen
        name="CommentNav"
        component={CommentScreen}
        options={({ navigation }) => ({
          ...routerOptions.commentsOptions(navigation),
        })}
      />
      <ProfileNav.Screen
        name="MapNav"
        component={MapScreen}
        options={({ navigation }) => ({
          ...routerOptions.mapOptions(navigation),
        })}
      />
    </ProfileNav.Navigator>
  );
};
export default ProfileScreenNav;