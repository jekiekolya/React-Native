import tabBarOptions from "./tabBarOptions";

import getActiveRouteState from "../helpers/getActiveRouteState";
// Icons
import routerIcons from "../assets/images/routerIcons";
const { SvgPerson } = routerIcons;

const profileOptions = (navigation) => {
  let navName = null;
  if (navigation?.getState()) {
    navName = getActiveRouteState(
      getActiveRouteState(navigation?.getState())?.state
    )?.name;
  }

  return {
    // Header
    headerShown: false,
    // TabBar
    tabBarStyle:
      navName === "CommentNav"
        ? { display: "none" }
        : { ...tabBarOptions.tabBarStyle },
    tabBarIcon: ({ focused, color, size }) => (
      <SvgPerson color={color} size={size} />
    ),
  };
};

export default profileOptions;
