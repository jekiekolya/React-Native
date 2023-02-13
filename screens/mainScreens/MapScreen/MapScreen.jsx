import { Text, View } from "react-native";

// Styles
import styles from "./MapScreen.Styled";

export default function MapScreen({ route }) {
  const location = route.params.location;

  return (
    <View style={styles.container}>
      <Text>{location}</Text>
    </View>
  );
}
