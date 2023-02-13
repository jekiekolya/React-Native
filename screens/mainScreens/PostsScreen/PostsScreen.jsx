import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Data
import posts from "../../../api/posts";

// Components
import CommentsEmptyIcon from "../../../assets/images/CommentsEmptyIcon";
import CommentsIcon from "../../../assets/images/CommentsIcon";
import LikeIcon from "../../../assets/images/LikeIcon";
import LocationIcon from "../../../assets/images/LocationIcon";

// Styles
import styles from "./PostsScreen.Styled";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        ListHeaderComponent={
          <View style={styles.containerHeader}>
            <Image
              source={{ uri: "https://i.stack.imgur.com/5Powi.jpg?s=192&g=1" }}
              style={styles.userPhoto}
            />
            <View>
              <Text style={styles.userName}>Natali Romanova</Text>
              <Text style={styles.userEmail}>email@example.com</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={styles.imagePost}
            />
            <Text style={styles.titlePost}>{item.title}</Text>
            <View style={styles.dataPost}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 24,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CommentNav", {
                        comments: item.comments,
                        postImageUrl: item.imageUrl,
                      })
                    }
                    activeOpacity={0.8}
                  >
                    {item.countComments === 0 ? (
                      <CommentsEmptyIcon style={{ marginRight: 6 }} />
                    ) : (
                      <CommentsIcon style={{ marginRight: 6 }} />
                    )}
                  </TouchableOpacity>

                  <Text style={styles.textPost}>{item.countComments}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <LikeIcon style={{ marginRight: 6 }} />
                  <Text style={styles.textPost}>{item.countLikes}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LocationIcon style={{ marginRight: 4 }} />
                <Text
                  style={{
                    ...styles.textPost,
                    textDecorationLine: "underline",
                  }}
                >
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
