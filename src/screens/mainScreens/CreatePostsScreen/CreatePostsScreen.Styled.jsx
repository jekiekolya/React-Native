import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",

    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  imgUploadWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: 240,

    marginBottom: 8,

    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },

  iconUploadWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 60,
    height: 60,

    backgroundColor: "#FFFFFF",
    borderRadius: 30,
  },

  imgWrapper: {
    position: "relative",

    width: "100%",
    height: 240,

    marginBottom: 8,
    borderRadius: 8,

    overflow: "hidden",
  },

  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -60 / 2 }, { translateY: -60 / 2 }],

    width: 60,
    height: 60,

    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
  },

  textInfo: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "left",
    color: "#BDBDBD",
  },

  formWrapper: {
    marginTop: 33,
  },

  input: {
    width: "100%",
    height: 50,

    fontSize: 16,
    lineHeight: 19,
    color: "#212121",

    backgroundColor: "#FFFFFF",

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  inputPlaceholder: {
    fontWeight: "regular",
    color: "#BDBDBD",
  },

  buttonCreatePost: {
    justifyContent: "center",

    height: 51,
    marginTop: 32,

    borderRadius: 100,
  },

  textCreatePost: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },

  trashWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 70,
    height: 40,

    borderRadius: 20,
  },

  // Camera
  cameraWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    position: "relative",

    width: "100%",
    height: "100%",
  },
  cameraSnap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    bottom: 0,
    left: "50%",

    width: 60,
    height: 60,

    backgroundColor: "rgba(255, 255, 255, 0.3)",

    borderRadius: 30,

    transform: [{ translateX: -60 / 2 }, { translateY: -60 / 2 }],
    zIndex: 1000,
  },
  newPhotoWrapper: {
    position: "absolute",
    top: 8,
    right: 8,

    width: 180,
    height: 120,

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,

    overflow: "hidden",
  },

  closeCameraWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    top: 8,
    left: 8,

    padding: 8,

    backgroundColor: "rgba(255, 255, 255, 0.3)",

    borderRadius: 15,
  },
  closeCameraText: {
    color: "#FFFFFF",
  },
  NoAccessTextWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    top: "50%",
    left: "50%",

    width: 300,
    height: 100,

    transform: [{ translateX: -300 / 2 }, { translateY: -100 / 2 }],
  },
});

export default styles;
