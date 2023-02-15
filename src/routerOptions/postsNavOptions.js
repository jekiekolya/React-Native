import tabBarOptions from "./tabBarOptions";
// Helpers
import getActiveRouteState from "../helpers/getActiveRouteState";

// Icons
import routerIcons from "../assets/images/routerIcons";
const { SvgGrid } = routerIcons;

const postsNavOptions = (navigation) => {
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
      <SvgGrid color={color} size={size} top={0} />
    ),
  };
};

export default postsNavOptions;
