import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerHeader: {
    width: "100%",

    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
  },
  postPhoto: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  containerItem: {
    display: "flex",
    flexDirection: "row",

    paddingHorizontal: 16,
    paddingBottom: 24,

    backgroundColor: "#FFFFFF",
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentWrapper: {
    flex: 1,
    padding: 16,

    backgroundColor: " rgba(0, 0, 0, 0.03)",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  commentAuthor: {
    marginBottom: 8,

    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,

    color: "#212121",
  },
  commentDate: {
    width: "100%",

    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,

    color: "#BDBDBD",
  },
  containerListFooter: {
    paddingBottom: 81,
    backgroundColor: "#FFFFFF",
  },
  containerFooter: {
    flex: 1,

    position: "absolute",
    bottom: 0,

    width: "100%",

    padding: 16,

    backgroundColor: "#FFFFFF",
  },
  commentInput: {
    position: "relative",

    width: "100%",
    height: 50,
    padding: 16,

    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,

    backgroundColor: "#F6F6F6",
    color: "#212121",

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    right: 8,
    bottom: 8,

    width: 34,
    height: 34,

    backgroundColor: "#FF6C00",

    borderRadius: 17,
  },
});

export default styles;
