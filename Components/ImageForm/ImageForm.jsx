import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Components
import AddIcon from "../../assets/images/AddIcon";
import CrossIcon from "../../assets/images/CrossIcon";

// Styles
import styles from "./ImageForm.styled";

export default function ImageForm() {
  const [image, setImage] = useState(null);
  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.user_imageWrapper}>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%", borderRadius: 16 }}
        />
      )}
      {image ? (
        <View style={styles.deleteBtnContainer}>
          <TouchableOpacity onPress={deleteImage} activeOpacity={0.8}>
            <CrossIcon />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.uploadBtnContainer}>
          <TouchableOpacity onPress={addImage} activeOpacity={0.8}>
            <AddIcon />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
