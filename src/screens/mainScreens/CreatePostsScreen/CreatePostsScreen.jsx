import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";

import { useKeyboard } from "../../../helpers/useKeyboard";

// Components
import CameraIcon from "../../../assets/images/screenIcons/CameraIcon";
import LocationIcon from "../../../assets/images/screenIcons/LocationIcon";
import TrashIcon from "../../../assets/images/screenIcons/TrashIcon";
import ArrowLeftIcon from "../../../assets/images/screenIcons/ArrowLeftIcon";

// Styles
import styles from "./CreatePostsScreen.Styled";

const initialState = {
  postName: "",
  postLocation: "",
};

export default function CreatePostsScreen() {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [cameraIsOpen, setCameraIsOpen] = useState(false);

  const [post, setPost] = useState(initialState);
  const [isReadyCreate, setIsReadyCreate] = useState(false);
  const [isReadyReset, setIsReadyReset] = useState(false);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  // State for styles
  const [borderInputColorPostName, setBorderInputColorPostName] =
    useState("#E8E8E8");
  const [borderInputColorPostLocation, setBorderInputColorPostLocation] =
    useState("#E8E8E8");

  // Height keyboard
  const heightKeyboard = useKeyboard();
  useEffect(() => {
    if (heightKeyboard === 0) {
      setIsShowKeyboard(false);
      return;
    }
    setIsShowKeyboard(true);
  }, [heightKeyboard, setIsShowKeyboard]);

  // Get permission to camera and media library
  useEffect(() => {
    if (cameraIsOpen) {
      (async () => {
        try {
          console.log(camera);
          const { status } = await Camera.requestCameraPermissionsAsync();
          await MediaLibrary.requestPermissionsAsync();

          setHasPermission(status === "granted");
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [cameraIsOpen]);
  // if (hasPermission === null && cameraIsOpen) {
  //   return <View />;
  // }
  // if (hasPermission === false && cameraIsOpen) {
  //   return <Text>No access to camera</Text>;
  // }
  // Activate button create post
  useEffect(() => {
    if (image && post.postName && post.postLocation && !isShowKeyboard) {
      setIsReadyCreate(true);
    }
    if (image || post.postName || post.postLocation) {
      setIsReadyReset(true);
    }
  }, [
    image,
    post.postName,
    post.postLocation,
    isShowKeyboard,
    setIsReadyCreate,
  ]);

  // handlers
  const onCameraToggle = () => {
    setCameraIsOpen(!cameraIsOpen);
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setImage(photo.uri);
    console.log(photo.uri);
  };

  const postNameHandler = (text) => setPost((p) => ({ ...p, postName: text }));
  const postLocationHandler = (text) =>
    setPost((p) => ({ ...p, postLocation: text }));

  const onCreatePost = () => {
    console.log("create post");
  };

  const onResetForm = () => {
    console.log("reset form");
    setImage(null);
    setPost(initialState);
    setIsReadyReset(false);
    setIsReadyCreate(false);
  };

  return (
    <>
      {cameraIsOpen ? (
        <Camera style={styles.cameraWrapper} ref={setCamera}>
          {hasPermission === false ? (
            <View style={styles.NoAccessTextWrapper}>
              <Text style={{ color: "#9f9f9f", fontSize: 24 }}>
                No access to camera
              </Text>
            </View>
          ) : (
            <>
              {image && (
                <View style={styles.newPhotoWrapper}>
                  <Image
                    source={{ uri: image }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={takePhoto}
                style={styles.cameraSnap}
              >
                <CameraIcon style={{ fill: "#FFF", color: "#FFF" }} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onCameraToggle}
                style={styles.closeCameraWrapper}
              >
                <ArrowLeftIcon style={{ marginRight: 8, stroke: "#fff" }} />

                <Text style={styles.closeCameraText}>Close camera</Text>
              </TouchableOpacity>
            </>
          )}
        </Camera>
      ) : (
        <View style={styles.container}>
          {image ? (
            <>
              <View
                style={{
                  ...styles.imgWrapper,
                  height: isShowKeyboard ? 200 : 240,
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%" }}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onCameraToggle}
                  style={styles.iconWrapper}
                >
                  <CameraIcon style={{ fill: "#FFF", color: "#FFF" }} />
                </TouchableOpacity>
              </View>
              <Text style={styles.textInfo}>Редагувати фото</Text>
            </>
          ) : (
            <>
              <View
                style={{
                  ...styles.imgUploadWrapper,
                  height: isShowKeyboard ? 200 : 240,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onCameraToggle}
                  style={styles.iconUploadWrapper}
                >
                  <CameraIcon style={{ fill: "#BDBDBD", color: "#BDBDBD" }} />
                </TouchableOpacity>
              </View>
              <Text style={styles.textInfo}>Завантажте фото</Text>
            </>
          )}
          <View style={styles.formWrapper}>
            <TextInput
              value={post.postName}
              onChangeText={postNameHandler}
              placeholder="Опис фото..."
              placeholderTextColor={"#BDBDBD"}
              placeholderFontWeight={"regular"}
              style={{
                ...styles.input,
                borderColor: borderInputColorPostName,
                fontWeight: "bold",
              }}
              onFocus={() => {
                setBorderInputColorPostName("#FF6C00");
              }}
              onBlur={() => {
                setBorderInputColorPostName("#E8E8E8");
              }}
            />
            <View style={{ position: "relative" }}>
              <TextInput
                value={post.postLocation}
                onChangeText={postLocationHandler}
                placeholder="Місце знаходження..."
                placeholderTextColor={"#BDBDBD"}
                placeholderStyle={styles.inputPlaceholder}
                style={{
                  ...styles.input,
                  borderColor: borderInputColorPostLocation,
                  paddingLeft: 28,
                  marginTop: 17,
                }}
                onFocus={() => {
                  setBorderInputColorPostLocation("#FF6C00");
                }}
                onBlur={() => {
                  setBorderInputColorPostLocation("#E8E8E8");
                }}
              />
              <LocationIcon
                style={{ position: "absolute", bottom: 13, fill: "#BDBDBD" }}
              />
            </View>
            <TouchableOpacity
              style={{
                ...styles.buttonCreatePost,
                backgroundColor: isReadyCreate ? "#FF6C00" : "#F6F6F6",
              }}
              onPress={isReadyCreate ? onCreatePost : () => {}}
              activeOpacity={isReadyCreate ? 0.8 : 1}
            >
              <Text
                style={{
                  ...styles.textCreatePost,
                  color: isReadyCreate ? "#FFFFFF" : "#BDBDBD",
                }}
              >
                Опублікувати
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 34,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onResetForm}
              style={{
                ...styles.trashWrapper,
                backgroundColor: isReadyReset ? "#FF6C00" : "#F6F6F6",
              }}
            >
              <TrashIcon
                style={{ stroke: isReadyReset ? "#FFFFFF" : "#DADADA" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
