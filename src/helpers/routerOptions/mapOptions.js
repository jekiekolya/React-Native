import { TouchableOpacity } from "react-native";

// Icons
import routerIcons from "../../assets/images/routerIcons";
const { SvgArrowLeft } = routerIcons;

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

export default mapOptions;
