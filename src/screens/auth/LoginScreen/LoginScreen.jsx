import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// Redux
import { useDispatch } from "react-redux";
import authOperations from "../../../redux/auth/authOperations";

import { useNavigation } from "@react-navigation/native";
import { useKeyboard } from "../../../helpers/useKeyboard";

// Components
import BGScreen from "../../../Components/BGScreen/BGScreen";

// Styles
import styles from "./LoginScreen.Styled";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  // State foe styles
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
  const emailHandler = (text) => setFormData((p) => ({ ...p, email: text }));
  const passwordHandler = (text) =>
    setFormData((p) => ({ ...p, password: text }));

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onLogin = () => {
    if (formData.email === "" || formData.password === "") {
      alert("Please fill all fields");
      return;
    }

    dispatch(authOperations.authLogin(formData));

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
              marginBottom: isShowKeyboard ? heightKeyboard - 241 : 0,
            }}
          >
            <Text style={styles.title}>????????????</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={styles.inputWrapper}>
                <TextInput
                  value={formData.email}
                  onChangeText={emailHandler}
                  placeholder="???????????? ?????????????????????? ??????????"
                  placeholderTextColor={"#BDBDBD"}
                  style={{
                    ...styles.input,
                    borderColor: borderInputColorEmail,
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
              onPress={onLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.textRegister}>????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.regNav}>?????????? ????????????? ??????????????????????????????</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BGScreen>
  );
}
