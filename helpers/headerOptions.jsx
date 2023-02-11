import { Button } from "react-native";
import LogOut from "../assets/images/LogOut";

// Home screen
const homeHeaderOptions = {
  title: "Публікації",
  headerStyle: {
    height: 88,

    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#d5d5d5",
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
  // headerRight: (navigation) => (
  //   <LogOut onPress={() => navigation.navigate("Login")} />
  // ),
};

const headerOptions = {
  homeHeaderOptions,
};

export default headerOptions;
