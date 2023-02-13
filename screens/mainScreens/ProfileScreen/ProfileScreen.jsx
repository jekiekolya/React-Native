import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Components
import BGScreen from "../../../Components/BGScreen/BGScreen";
import ImageForm from "../../../Components/ImageForm/ImageForm";
import LogOut from "../../../assets/images/routerIcons/SvgLogOut";
import CommentsIcon from "../../../assets/images/CommentsIcon";
import LikeIcon from "../../../assets/images/LikeIcon";
import LocationIcon from "../../../assets/images/LocationIcon";
import CommentsEmptyIcon from "../../../assets/images/CommentsEmptyIcon";

// Data
import posts from "../../../api/posts";

// Styles
import styles from "./ProfileScreen.Style";

export default function ProfileScreen({ setIsAuth }) {
  // handlers
  const logOut = () => {
    setIsAuth(false);
  };
  return (
    <BGScreen style={{ marginBottom: -83 }}>
      <SafeAreaView style={{ marginBottom: 83 }}>
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
          ListFooterComponent={<View style={styles.containerFooter} />}
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
                    {item.countComments === 0 ? (
                      <CommentsEmptyIcon style={{ marginRight: 6 }} />
                    ) : (
                      <CommentsIcon style={{ marginRight: 6 }} />
                    )}

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
    </BGScreen>
  );
}
