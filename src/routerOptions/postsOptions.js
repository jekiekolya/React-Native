import { TouchableOpacity } from "react-native";

// Redux

// Icons
import routerIcons from "../assets/images/routerIcons";
const { SvgLogOut, SvgGrid } = routerIcons;

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

export default postsOptions;
