import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Components
import BGScreen from "../../../Components/BGScreen/BGScreen";
import ImageForm from "../../../Components/ImageForm/ImageForm";
import LogOut from "../../../assets/images/routerIcons/SvgLogOut";
import CommentsIcon from "../../../assets/images/screenIcons/CommentsIcon";
import LikeIcon from "../../../assets/images/screenIcons/LikeIcon";
import LocationIcon from "../../../assets/images/screenIcons/LocationIcon";
import CommentsEmptyIcon from "../../../assets/images/screenIcons/CommentsEmptyIcon";

// Data
import posts from "../../../api/posts";

// Styles
import styles from "./ProfileScreen.Style";

export default function ProfileScreen({ setIsAuth }) {
  const navigation = useNavigation();

  // handlers
  const logOut = () => {
    setIsAuth(false);
  };
  return (
    <BGScreen style={{ marginBottom: -83 }}>
      <SafeAreaView
        style={{
          marginBottom: 50,
          width: "100%",
          minHeight: 665,
        }}
      >
        <FlatList
          data={posts}
          ListHeaderComponent={
            <View style={styles.containerHeader}>
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
          }
          ListFooterComponent={
            <View
              style={{
                ...styles.containerFooter,
              }}
            />
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
                      {item.comments.length === 0 ? (
                        <CommentsEmptyIcon style={{ marginRight: 6 }} />
                      ) : (
                        <CommentsIcon style={{ marginRight: 6 }} />
                      )}
                    </TouchableOpacity>

                    <Text style={styles.textPost}>{item.comments.length}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <LikeIcon style={{ marginRight: 6 }} />
                    <Text style={styles.textPost}>{item.countLikes}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MapNav", {
                      location: item.location,
                    })
                  }
                  activeOpacity={0.8}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <LocationIcon style={{ marginRight: 4 }} />
                  <Text
                    style={{
                      ...styles.textPost,
                      textDecorationLine: "underline",
                    }}
                  >
                    {item.location}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <View
          style={{
            marginTop: -1,
            flexGrow: 10 ** 10,
            backgroundColor: "#FFFFFF",
          }}
        />
      </SafeAreaView>
    </BGScreen>
  );
}
