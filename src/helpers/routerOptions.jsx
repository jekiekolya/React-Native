import { TouchableOpacity } from "react-native";

// Helpers
import getActiveRouteState from "./getActiveRouteState";

// Icons
import routerIcons from "../assets/images/routerIcons";
const { SvgLogOut, SvgGrid, SvgPerson, SvgPlus, SvgArrowLeft } = routerIcons;

// TabBar
const tabBarOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: "blue",
  tabBarStyle: {
    height: 83,

    paddingHorizontal: 45,
    paddingTop: 9,
    paddingBottom: 34,

    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#b3b3b3",
  },
};

// Posts screen
const postsOptions = (setIsAuth) => {
  return {
    // Header
    title: "Публікації",
    headerStyle: {
      height: 88,

      backgroundColor: "#FFFFFF",
      borderBottomWidth: 1,
      borderBottomColor: "#b3b3b3",
    },
    headerTitleAlign: "center",
    headerTitleContainerStyle: { paddingHorizontal: 16 },

    headerTintColor: "#212121",
    headerTitleStyle: {
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: 17,
      lineHeight: 22,

      bottom: 11,
    },
    headerRight: () => (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          right: 16,
          bottom: 10,
        }}
        onPress={() => setIsAuth(false)}
      >
        <SvgLogOut />
      </TouchableOpacity>
    ),

    // TabBar

    tabBarIcon: ({ focused, color, size }) => (
      <SvgGrid color={color} size={size} top={0} />
    ),
  };
};
// PostsNav screen
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

// Create post screen
const createPostOptions = (navigation) => {
  return {
    // Header
    title: "Створити публікацію",
    headerStyle: {
      height: 88,

      backgroundColor: "#FFFFFF",
      borderBottomWidth: 1,
      borderBottomColor: "#b3b3b3",
    },
    headerTitleAlign: "center",
    headerTitleContainerStyle: { paddingHorizontal: 16 },

    headerTintColor: "#212121",
    headerTitleStyle: {
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: 17,
      lineHeight: 22,

      bottom: 11,
    },

    headerLeft: () => (
      <TouchableOpacity
        activeOpacity={0.1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          left: 16,
          bottom: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <SvgArrowLeft />
      </TouchableOpacity>
    ),

    // TabBar
    tabBarStyle: { display: "none" },
    tabBarIcon: ({ focused }) => <SvgPlus color="#FFFFFF" size={13} />,
    tabBarIconStyle: {
      width: 70,
      height: 40,

      backgroundColor: "#FF6C00",
      borderRadius: 20,
    },
  };
};

// Profile screen
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

// Comments screen
const commentsOptions = (navigation) => ({
  // Header
  title: "Коментарі",
  headerStyle: {
    height: 88,

    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b3",
  },
  headerTitleAlign: "center",
  headerTitleContainerStyle: { paddingHorizontal: 16 },

  headerTintColor: "#212121",
  headerTitleStyle: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,

    bottom: 11,
  },

  headerLeft: () => (
    <TouchableOpacity
      activeOpacity={0.1}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        left: 16,
        bottom: 10,
      }}
      onPress={() => navigation.goBack()}
    >
      <SvgArrowLeft />
    </TouchableOpacity>
  ),
});
// Map screen
const mapOptions = (navigation) => ({
  // Header
  title: "Місце знаходження",
  headerStyle: {
    height: 88,

    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b3",
  },
  headerTitleAlign: "center",
  headerTitleContainerStyle: { paddingHorizontal: 16 },

  headerTintColor: "#212121",
  headerTitleStyle: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,

    bottom: 11,
  },

  headerLeft: () => (
    <TouchableOpacity
      activeOpacity={0.1}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        left: 16,
        bottom: 10,
      }}
      onPress={() => navigation.goBack()}
    >
      <SvgArrowLeft />
    </TouchableOpacity>
  ),
});

const routerOptions = {
  postsOptions,
  createPostOptions,
  profileOptions,
  tabBarOptions,
  commentsOptions,
  mapOptions,
  postsNavOptions,
};

export default routerOptions;