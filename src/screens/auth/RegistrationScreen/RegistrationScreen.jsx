import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useKeyboard } from "../../../helpers/useKeyboard";
import uploadPhotoToServer from "../../../api/uploadPhotoToServer";

// Redux
import { useDispatch } from "react-redux";
import authOperations from "../../../redux/auth/authOperations";

// Components
import BGScreen from "../../../Components/BGScreen/BGScreen";
import ImageForm from "../../../Components/ImageForm/ImageForm";

// Styles
import styles from "./RegistrationScreen.Styled";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);

  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  // State foe styles
  const [borderInputColorName, setBorderInputColorName] = useState("#E8E8E8");
  const [borderInputColorEmail, setBorderInputColorEmail] = useState("#E8E8E8");
  const [borderInputColorPassword, setBorderInputColorPassword] =
    useState("#E8E8E8");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Height keyboard
  const heightKeyboard = useKeyboard();
  useEffect(() => {
    if (heightKeyboard === 0) {
      setIsShowKeyboard(false);
      return;
    }
    setIsShowKeyboard(true);
  }, [heightKeyboard, setIsShowKeyboard]);

  // Event handlers
  const nameHandler = (text) => setFormData((p) => ({ ...p, name: text }));
  const emailHandler = (text) => setFormData((p) => ({ ...p, email: text }));
  const passwordHandler = (text) =>
    setFormData((p) => ({ ...p, password: text }));

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onRegister = async () => {
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.name === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (image === null) {
      alert("Please pick an image");
      return;
    }

    dispatch(authOperations.authRegister({ ...formData, image }));

    // setFormData(initialState);
  };

  return (
    <BGScreen
      style={{
        marginBottom: isShowKeyboard ? -heightKeyboard : 0,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={{
              ...styles.wrapper,
              marginBottom: isShowKeyboard ? heightKeyboard - 175 : 0,
            }}
          >
            <ImageForm image={image} setImage={setImage} />
            <Text style={styles.title}>????????????????????</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={styles.inputWrapper}>
                <TextInput
                  value={formData.name}
                  onChangeText={nameHandler}
                  placeholder="??????????"
                  placeholderTextColor={"#BDBDBD"}
                  style={{
                    ...styles.input,
                    borderColor: borderInputColorName,
                  }}
                  onFocus={() => {
                    setBorderInputColorName("#FF6C00");
                  }}
                  onBlur={() => {
                    setBorderInputColorName("#E8E8E8");
                  }}
                />
                <TextInput
                  value={formData.email}
                  onChangeText={emailHandler}
                  placeholder="???????????? ?????????????????????? ??????????"
                  placeholderTextColor={"#BDBDBD"}
                  style={{
                    ...styles.input,

                    borderColor: borderInputColorEmail,
                    marginTop: 16,
                  }}
                  onFocus={() => {
                    setBorderInputColorEmail("#FF6C00");
                  }}
                  onBlur={() => {
                    setBorderInputColorEmail("#E8E8E8");
                  }}
                />
                <View style={[styles.inputLayout, styles.inputGap]}>
                  <TextInput
                    value={formData.password}
                    onChangeText={passwordHandler}
                    placeholder="????????????"
                    secureTextEntry={showPassword}
                    placeholderTextColor={"#BDBDBD"}
                    style={{
                      ...styles.input,
                      borderColor: borderInputColorPassword,
                    }}
                    onFocus={() => {
                      setBorderInputColorPassword("#FF6C00");
                    }}
                    onBlur={() => {
                      setBorderInputColorPassword("#E8E8E8");
                    }}
                  />
                  {showPassword ? (
                    <Text
                      style={styles.buttonShow}
                      onPress={handleShowPassword}
                    >
                      ????????????????
                    </Text>
                  ) : (
                    <Text
                      style={styles.buttonShow}
                      onPress={handleShowPassword}
                    >
                      ??????????????????
                    </Text>
                  )}
                </View>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.buttonRegister}
              onPress={onRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.textRegister}>??????????????????????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.regNav}>?????? ?? ????????????? ????????????</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BGScreen>
  );
}
