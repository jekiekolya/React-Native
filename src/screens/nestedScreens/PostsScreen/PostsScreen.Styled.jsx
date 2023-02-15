import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
  },
  userPhoto: {
    width: 60,
    height: 60,

    marginRight: 8,

    borderRadius: 16,
  },
  userName: {
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,

    color: "#212121",
  },
  userEmail: {
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,

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
