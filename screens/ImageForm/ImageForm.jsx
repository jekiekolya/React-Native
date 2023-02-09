import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Components
import AddIcon from "../../assets/images/AddIcon";

// Styles
import styles from "./ImageForm.styled";

export default function ImageForm() {
  const [image, setImage] = useState(null);
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
  return (
    <View style={styles.user_imageWrapper}>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 120, height: 120, borderRadius: 16 }}
        />
      )}
      <View style={styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage}>
          <AddIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}