import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerHeader: {
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
  containerFooter: {
    flex: 1,
    flexGrow: 10000,
    width: "100%",
    minHeight: 30,

    backgroundColor: "#FFFFFF",
  },
  logOutIcon: {
    position: "absolute",
    top: 22,
    right: 16,
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
  listItem: {
    width: "100%",
    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",
  },
  imagePost: {
    width: "100%",
    height: 240,

    marginBottom: 8,

    borderRadius: 8,
  },
  titlePost: {
    width: "100%",

    marginBottom: 11,

    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "left",
  },
  dataPost: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",

    paddingBottom: 32,
  },
  textPost: {
    fontSize: 16,
    lineHeight: 19,

    color: "#212121",
  },
});

export default styles;
