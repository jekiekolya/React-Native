import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../../../redux/auth/authSelectors";

// Components
import CameraIcon from "../../../assets/images/screenIcons/CameraIcon";
import LocationIcon from "../../../assets/images/screenIcons/LocationIcon";
import TrashIcon from "../../../assets/images/screenIcons/TrashIcon";
import ArrowLeftIcon from "../../../assets/images/screenIcons/ArrowLeftIcon";

// helpers
import { useKeyboard } from "../../../helpers/useKeyboard";

// API
import uploadPhotoToServer from "../../../api/uploadPhotoToServer";

// Styles
import styles from "./CreatePostsScreen.Styled";
import postsOperations from "../../../redux/posts/postsOperations";

const initialState = {
  title: "",
  location: "",
  locationData: {
    latitude: 0,
    longitude: 0,
  },
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
  const [borderInputColorTitle, setBorderInputColorTitle] = useState("#E8E8E8");
  const [borderInputColorPostLocation, setBorderInputColorPostLocation] =
    useState("#E8E8E8");

  // Navigation
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // User data
  const user = useSelector(authSelectors.getUser);

  // Height keyboard
  const heightKeyboard = useKeyboard();
  useEffect(() => {
    if (heightKeyboard === 0) {
      setIsShowKeyboard(false);
      return;
    }
    setIsShowKeyboard(true);
  }, [heightKeyboard, setIsShowKeyboard]);

  // Get permission to camera, location and media library
  useEffect(() => {
    if (cameraIsOpen) {
      (async () => {
        try {
          const resCamera = await Camera.requestCameraPermissionsAsync();
          const resMedia = await MediaLibrary.requestPermissionsAsync();
          const resLocation =
            await Location.requestForegroundPermissionsAsync();

          const statusCamera = resCamera.status;
          const statusMedia = resMedia.status;
          const statusLocation = resLocation.status;

          setHasPermission(
            statusCamera === "granted" &&
              statusMedia === "granted" &&
              statusLocation === "granted"
          );

          const { coords } = await Location.getCurrentPositionAsync();

          setPost((p) => ({
            ...p,
            locationData: {
              latitude: coords.latitude,
              longitude: coords.longitude,
            },
          }));
        } catch (error) {
          alert(error.message);
        }
      })();
    }
  }, [cameraIsOpen]);

  // Activate button create post
  useEffect(() => {
    if (image && post.title && post.location && !isShowKeyboard) {
      setIsReadyCreate(true);
    }
    if (image || post.title || post.location) {
      setIsReadyReset(true);
    }
  }, [image, post.title, post.location, isShowKeyboard, setIsReadyCreate]);

  // handlers
  const onCameraToggle = () => {
    setCameraIsOpen(!cameraIsOpen);
  };

  // Take photo
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setImage(photo.uri);
  };

  // Pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4.5, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const titleHandler = (text) => setPost((p) => ({ ...p, title: text }));
  const postLocationHandler = (text) =>
    setPost((p) => ({ ...p, location: text }));

  const onResetForm = () => {
    setImage(null);
    setPost(initialState);
    setIsReadyReset(false);
    setIsReadyCreate(false);
  };

  const onCreatePost = async () => {
    const imageUrl = await uploadPhotoToServer(image);
    dispatch(
      postsOperations.addPost({
        ...post,
        imageUrl,
        userId: user?.userId,
      })
    );

    navigation.navigate("PostsNav");
    onResetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {cameraIsOpen ? (
        <Camera style={styles.cameraWrapper} ref={setCamera}>
          {hasPermission === false ? (
            <>
              <View style={styles.NoAccessTextWrapper}>
                <Text
                  style={{
                    color: "#9f9f9f",
                    fontSize: 24,
                    textAlign: "center",
                  }}
                >
                  No access to camera, media library or location
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onCameraToggle}
                style={{
                  ...styles.closeCameraWrapper,
                  backgroundColor: "rgba(75, 75, 75, 0.7)",
                }}
              >
                <ArrowLeftIcon style={{ marginRight: 8, stroke: "#fff" }} />

                <Text style={styles.closeCameraText}>Close camera</Text>
              </TouchableOpacity>
            </>
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
                onPress={pickImage}
                style={styles.pickImageWrapper}
              >
                <Entypo name="images" size={24} color="#FFF" />
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
              value={post.title}
              onChangeText={titleHandler}
              placeholder="Опис фото..."
              placeholderTextColor={"#BDBDBD"}
              placeholderFontWeight={"regular"}
              style={{
                ...styles.input,
                borderColor: borderInputColorTitle,
                fontWeight: "bold",
              }}
              onFocus={() => {
                setBorderInputColorTitle("#FF6C00");
              }}
              onBlur={() => {
                setBorderInputColorTitle("#E8E8E8");
              }}
            />
            <View style={{ position: "relative" }}>
              <TextInput
                value={post.location}
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
    </TouchableWithoutFeedback>
  );
}
