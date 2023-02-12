import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",

    width: "100%",

    marginTop: 147,
    paddingTop: 92,
    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userName: {
    marginBottom: 33,

    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 30 * 0.01,

    color: "#212121",
  },
  logOutIcon: {
    position: "absolute",
    top: 22,
    right: 16,
  },
});

export default styles;
