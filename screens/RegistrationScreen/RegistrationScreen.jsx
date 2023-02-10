import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useKeyboard } from "../../helpers/useKeyboard";

// Components
import BGScreen from "../BGScreen/BGScreen";
import ImageForm from "../ImageForm/ImageForm";

// Styles
import styles from "./RegistrationScreen.Styled";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [formData, setFormData] = useState(initialState);

  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  // State foe styles
  const [borderInputColorName, setBorderInputColorName] = useState("#E8E8E8");
  const [borderInputColorEmail, setBorderInputColorEmail] = useState("#E8E8E8");
  const [borderInputColorPassword, setBorderInputColorPassword] =
    useState("#E8E8E8");

  // Height keyboard
  const heightKeyboard = useKeyboard();
  useEffect(() => {
    if (heightKeyboard === 0) {
      setIsShowKeyboard(false);
    }
  }, [heightKeyboard, setIsShowKeyboard]);

  // Event handlers
  const nameHandler = (text) => setFormData((p) => ({ ...p, name: text }));
  const emailHandler = (text) => setFormData((p) => ({ ...p, email: text }));
  const passwordHandler = (text) =>
    setFormData((p) => ({ ...p, password: text }));

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onRegister = () => {
    Alert.alert(
      "Credentials",
      `${formData.name} + ${formData.email} + ${formData.password}`
    );
    console.log(
      "Credentials:",
      `${formData.name} + ${formData.email} + ${formData.password}`
    );
    setFormData(initialState);
  };

  return (
    <BGScreen
      style={{
        marginBottom: isShowKeyboard ? -heightKeyboard : 0,
      }}
    >
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
                  setIsShowKeyboard(true);
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
                  setIsShowKeyboard(true);
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
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => {
                    setBorderInputColorPassword("#E8E8E8");
                  }}
                />
                {showPassword ? (
                  <Text style={styles.buttonShow} onPress={handleShowPassword}>
                    Показати
                  </Text>
                ) : (
                  <Text style={styles.buttonShow} onPress={handleShowPassword}>
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
          <Text
            style={styles.regNav}
            onPress={() => Linking.openURL("http://google.com")}
          >
            Уже є акаунт? Увійти
          </Text>
        </View>
      </View>
    </BGScreen>
  );
}
