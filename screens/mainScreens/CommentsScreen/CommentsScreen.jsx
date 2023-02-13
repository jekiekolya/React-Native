import { Text, View } from "react-native";

// Styles
import styles from "./CommentsScreen.Styled";

export default function CommentsScreen({ route }) {
  const comments = route.params.comments;
  console.log(comments);
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  );
}
