import { Text, TouchableOpacity, View } from "react-native";

// Components
import BGScreen from "../../../Components/BGScreen/BGScreen";
import ImageForm from "../../../Components/ImageForm/ImageForm";
import LogOut from "../../../assets/images/routerIcons/SvgLogOut";

// Styles
import styles from "./ProfileScreen.Style";

export default function ProfileScreen() {
  // handlers
  const logOut = () => {
    // navigation.navigate("Login");
    console.log("LogOut");
  };
  return (
    <BGScreen style={{ marginBottom: -83 }}>
      <View style={styles.container}>
        <ImageForm />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.logOutIcon}
          onPress={logOut}
        >
          <LogOut />
        </TouchableOpacity>

        <Text style={styles.userName}>Natali Romanova</Text>
      </View>
    </BGScreen>
  );
}
