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
import AddIcon from "../../assets/images/AddIcon";

// Styles
import styles from "./RegistrationScreen.Styled";

export default function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  // State foe styles
  const [borderInputColorName, setBorderInputColorName] = useState("#E8E8E8");
  const [borderInputColorEmail, setBorderInputColorEmail] = useState("#E8E8E8");
  const [borderInputColorPassword, setBorderInputColorPassword] =
    useState("#E8E8E8");

  // Event handlers
  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onRegister = () => {
    Alert.alert("Credentials", `${name} + ${email} + ${password}`);
    console.log("Credentials:", `${name} + ${email} + ${password}`);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <BGScreen
      style={{
        marginBottom: isShowKeyboard ? -167 : 0,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            ...styles.wrapper,
          }}
        >
          <View style={styles.user_imageWrapper}>
            <AddIcon style={styles.user_addIcon} />
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.inputWrapper}>
              <TextInput
                value={name}
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
                  setIsShowKeyboard(false);
                }}
              />
              <TextInput
                value={email}
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
