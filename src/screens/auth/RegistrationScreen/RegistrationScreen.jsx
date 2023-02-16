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

export default function RegistrationScreen({ setIsAuth }) {
  const [formData, setFormData] = useState(initialState);

  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  // State foe styles
  const [borderInputColorName, setBorderInputColorName] = useState("#E8E8E8");
  const [borderInputColorEmail, setBorderInputColorEmail] = useState("#E8E8E8");
  const [borderInputColorPassword, setBorderInputColorPassword] =
    useState("#E8E8E8");

  const navigation = useNavigation();

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

  const onRegister = () => {
    console.log({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    // setFormData(initialState);
    // setIsAuth(true);
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
            <ImageForm />
            <Text style={styles.title}>Реєстрація</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={styles.inputWrapper}>
                <TextInput
                  value={formData.name}
                  onChangeText={nameHandler}
                  placeholder="Логін"
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
                  placeholder="Адреса електронної пошти"
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
                    placeholder="Пароль"
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
                      Показати
                    </Text>
                  ) : (
                    <Text
                      style={styles.buttonShow}
                      onPress={handleShowPassword}
                    >
                      Приховати
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
              <Text style={styles.textRegister}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.regNav}>Уже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BGScreen>
  );
}
