import { ImageBackground } from "react-native";

import styles from "./BGScreen.Styled";

const BGImage = require("../../assets/images/bg_auth.png");

export default function BGScreen({ children, style }) {
  return (
    <ImageBackground source={BGImage} style={{ ...styles.image, ...style }}>
      {children}
    </ImageBackground>
  );
}
