import { TouchableOpacity } from "react-native";

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
const postsOptions = (setIsAuth) => ({
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
    >
      <SvgLogOut onPress={() => setIsAuth(false)} />
    </TouchableOpacity>
  ),

  // TabBar
  tabBarIcon: ({ focused, color, size }) => (
    <SvgGrid color={color} size={size} top={0} />
  ),
});

// Create post screen
function createPostOptions(navigation) {
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
      >
        <SvgArrowLeft onPress={() => navigation.goBack()} />
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
}

// Profile screen
const profileOptions = {
  // Header
  headerShown: false,
  // TabBar
  tabBarIcon: ({ focused, color, size }) => (
    <SvgPerson color={color} size={size} />
  ),
};

const routerOptions = {
  postsOptions,
  createPostOptions,
  profileOptions,
  tabBarOptions,
};

export default routerOptions;
