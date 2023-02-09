import { useState } from "react";
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

// Components
import BGScreen from "../BGScreen/BGScreen";

// Styles
import styles from "./LoginScreen.Styled";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  // State foe styles
  const [borderInputColorEmail, setBorderInputColorEmail] = useState("#E8E8E8");
  const [borderInputColorPassword, setBorderInputColorPassword] =
    useState("#E8E8E8");

  // Event handlers
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onRegister = () => {
    Alert.alert("Credentials", `${email} + ${password}`);
    console.log("Credentials:", `${email} + ${password}`);
    setEmail("");
    setPassword("");
  };

  return (
    <BGScreen
      style={{
        marginBottom: isShowKeyboard ? -241 : 0,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            ...styles.wrapper,
          }}
        >
          <Text style={styles.title}>Увійти</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.inputWrapper}>
              <TextInput
                value={email}
                onChangeText={emailHandler}
                placeholder="Адреса електронної пошти"
                placeholderTextColor={"#BDBDBD"}
                style={{
                  ...styles.input,
                  borderColor: borderInputColorEmail,
                }}
                onFocus={() => {
                  setBorderInputColorEmail("#FF6C00");
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setBorderInputColorEmail("#E8E8E8");
                  setIsShowKeyboard(false);
                }}
              />
              <View style={[styles.inputLayout, styles.inputGap]}>
                <TextInput
                  value={password}
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
                    setIsShowKeyboard(false);
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
            <Text style={styles.textRegister}>Увійти</Text>
          </TouchableOpacity>
          <Text
            style={styles.regNav}
            onPress={() => Linking.openURL("http://google.com")}
          >
            Немає акаунт? Зареєструватися
          </Text>
        </View>
      </View>
    </BGScreen>
  );
}
