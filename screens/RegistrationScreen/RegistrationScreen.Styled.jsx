import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },

  wrapper: {
    position: "relative",

    width: "100%",
    height: 549,

    paddingTop: 92,
    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  title: {
    color: "#212121",

    fontWeight: "Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01 * 30,

    textAlign: "center",
  },
  inputWrapper: {
    marginTop: 33,
  },

  input: {
    width: "100%",
    height: 50,

    padding: 16,

    backgroundColor: "#F6F6F6",

    fontSize: 16,
    lineHeight: 19,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },

  inputGap: {
    marginTop: 16,
  },

  inputLayout: {
    position: "relative",
  },

  buttonShow: {
    position: "absolute",
    top: 26,
    right: 16,

    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",

    transform: [{ translateY: -25 / 2 }],
  },

  buttonRegister: {
    justifyContent: "center",

    height: 51,

    marginTop: 43,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  textRegister: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",

    color: "#FFFFFF",
  },

  regNav: {
    marginTop: 16,

    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",

    color: "#1B4371",
  },
});

export default styles;
