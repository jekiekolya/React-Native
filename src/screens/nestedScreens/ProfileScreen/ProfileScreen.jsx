import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Redux
import { useDispatch, useSelector } from "react-redux";
import authOperations from "../../../redux/auth/authOperations";
import postsOperations from "../../../redux/posts/postsOperations";
import userOperations from "../../../redux/user/userOperation";
import { authSelectors } from "../../../redux/auth/authSelectors";
import { postsSelectors } from "../../../redux/posts/postsSelectors";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Components
import BGScreen from "../../../Components/BGScreen/BGScreen";
import ImageForm from "../../../Components/ImageForm/ImageForm";
import LogOut from "../../../assets/images/routerIcons/SvgLogOut";
import CommentsIcon from "../../../assets/images/screenIcons/CommentsIcon";
import LikeIcon from "../../../assets/images/screenIcons/LikeIcon";
import LocationIcon from "../../../assets/images/screenIcons/LocationIcon";
import CommentsEmptyIcon from "../../../assets/images/screenIcons/CommentsEmptyIcon";

// Styles
import styles from "./ProfileScreen.Style";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userName, userId, userAvatar } = useSelector(authSelectors.getUser);

  const [image, setImage] = useState(userAvatar);

  const ownPosts = useSelector(postsSelectors.getOwnPosts);

  // Get posts
  useEffect(() => {
    dispatch(postsOperations.getOwnPosts());
  }, [dispatch, postsOperations]);

  // Update avatar
  useEffect(() => {
    if (image !== userAvatar && image !== null) {
      dispatch(userOperations.updateUserAvatar(image));
    }
  }, [dispatch, userOperations, image]);

  // handlers
  const logOut = () => {
    dispatch(authOperations.authLogout());
  };

  const addLike = (postId) => {
    dispatch(postsOperations.addLikeByPostID(postId));
  };

  const deleteLike = (postId) => {
    dispatch(postsOperations.deleteLikeByPostID(postId));
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
          data={ownPosts}
          ListHeaderComponent={
            <View style={styles.containerHeader}>
              <ImageForm image={image} setImage={setImage} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.logOutIcon}
                onPress={logOut}
              >
                <LogOut />
              </TouchableOpacity>

              <Text style={styles.userName}>{userName}</Text>
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
                          postId: item.id,
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

                    <Text style={styles.textPost}>
                      {item.countComments || 0}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {item.isLiked ? (
                      <AntDesign
                        name="like1"
                        size={20}
                        color="#FF6C00"
                        style={{ marginRight: 6, marginBottom: 4 }}
                        onPress={() => deleteLike(item.id)}
                      />
                    ) : (
                      <LikeIcon
                        style={{ marginRight: 6 }}
                        onPress={() => addLike(item.id)}
                      />
                    )}
                    <Text style={styles.textPost}>{item.countLikes}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MapNav", {
                      location: item.location,
                      locationData: item.locationData,
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
