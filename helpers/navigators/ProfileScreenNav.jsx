import { createStackNavigator } from "@react-navigation/stack";

// Components
import ProfileScreen from "../../screens/mainScreens/ProfileScreen/ProfileScreen";
import CommentScreen from "../../screens/mainScreens/CommentsScreen/CommentsScreen";

// Options
import routerOptions from "../routerOptions";

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
    </ProfileNav.Navigator>
  );
};
export default ProfileScreenNav;
