import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useKeyboard } from "../../../helpers/useKeyboard";

// Components
import CameraIcon from "../../../assets/images/CameraIcon";
import LocationIcon from "../../../assets/images/LocationIcon";
import TrashIcon from "../../../assets/images/TrashIcon";

// Styles
import styles from "./CreatePostsScreen.Styled";

const initialState = {
  postName: "",
  postLocation: "",
};

export default function CreatePostsScreen() {
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(initialState);
  const [isReadyCreate, setIsReadyCreate] = useState(false);
  const [isReadyReset, setIsReadyReset] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  // State foe styles
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
  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
              onPress={addImage}
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
              onPress={addImage}
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
          <TrashIcon style={{ stroke: isReadyReset ? "#FFFFFF" : "#DADADA" }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
