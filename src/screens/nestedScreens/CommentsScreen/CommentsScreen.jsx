import { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import postsOperations from "../../../redux/posts/postsOperations";
import { authSelectors } from "../../../redux/auth/authSelectors";
import { postsSelectors } from "../../../redux/posts/postsSelectors";

// Components
import ArrowUpIcon from "../../../assets/images/screenIcons/ArrowUpIcon";

// Styles
import styles from "./CommentsScreen.Styled";

export default function CommentsScreen({ route }) {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const postId = route.params.postId;
  const postImageUrl = route.params.postImageUrl;

  const { userId } = useSelector(authSelectors.getUser);
  const comments = useSelector(postsSelectors.getComments);

  useEffect(() => {
    dispatch(postsOperations.getAllCommentsByPostId(postId));
  }, [dispatch, postsOperations]);

  // Handlers
  const commentHandler = (text) => {
    setComment(text);
  };

  const onAddComment = () => {
    dispatch(postsOperations.addCommentByPostID(postId, comment));
    // setComment("");
  };
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <FlatList
        data={comments ?? []}
        style={{ backgroundColor: "#FFFFFF" }}
        ListHeaderComponent={
          <View style={styles.containerHeader}>
            <Image source={{ uri: postImageUrl }} style={styles.postPhoto} />
          </View>
        }
        ListFooterComponent={<View style={styles.containerListFooter}></View>}
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.containerItem,
              flexDirection: item.authorId === userId ? "row-reverse" : "row",
            }}
          >
            <Image
              source={{ uri: item.authorAvatar }}
              style={{
                ...styles.authorAvatar,
                marginRight: item.authorId === userId ? 0 : 16,
                marginLeft: !item.authorId === userId ? 0 : 16,
              }}
            />
            <View
              style={{
                ...styles.commentWrapper,
                borderTopRightRadius: item.authorId === userId ? 0 : 16,
                borderTopLeftRadius: !item.authorId === userId ? 0 : 16,
              }}
            >
              <Text style={styles.commentAuthor}>{item.comment}</Text>
              <Text
                style={{
                  ...styles.commentDate,
                  textAlign: item.authorId === userId ? "left" : "right",
                }}
              >
                {item.createdAt}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.containerFooter}>
        <View>
          <TextInput
            value={comment}
            onChangeText={commentHandler}
            placeholder="Коментувати..."
            placeholderTextColor={"#BDBDBD"}
            placeholderTextFontSize={50}
            style={styles.commentInput}
          />
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={onAddComment}
            activeOpacity={0.8}
          >
            <ArrowUpIcon />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
