import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  user_imageWrapper: {
    position: "absolute",
    top: 0,
    left: "50%",

    width: 120,
    height: 120,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,

    transform: [{ translateX: (-120 + 32) / 2 }, { translateY: -120 / 2 }],
    zIndex: 1000,
  },
  uploadBtnContainer: {
    position: "absolute",
    bottom: 14,
    right: 0,

    width: 25,
    height: 25,

    backgroundColor: "transparent",

    transform: [{ translateX: 25 / 2 }],
    zIndex: 10000,
  },
  deleteBtnContainer: {
    position: "absolute",
    bottom: 20,
    right: 0,

    width: 25,
    height: 25,

    backgroundColor: "transparent",

    transform: [{ translateX: 14 / 2 }],
    zIndex: 10000,
  },
});

export default styles;
