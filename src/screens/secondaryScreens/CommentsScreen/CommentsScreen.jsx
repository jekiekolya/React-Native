import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Components
import ArrowUpIcon from "../../../assets/images/screenIcons/ArrowUpIcon";

// Styles
import styles from "./CommentsScreen.Styled";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");

  const comments = route.params.comments;
  const postImageUrl = route.params.postImageUrl;

  // Handlers
  const commentHandler = (text) => {
    setComment(text);
  };

  const onAddComment = () => {
    console.log(comment);
    setComment("");
  };
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <FlatList
        data={comments}
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
              flexDirection: item.owner ? "row-reverse" : "row",
            }}
          >
            <Image
              source={{ uri: item.authorAvatar }}
              style={{
                ...styles.authorAvatar,
                marginRight: item.owner ? 0 : 16,
                marginLeft: !item.owner ? 0 : 16,
              }}
            />
            <View
              style={{
                ...styles.commentWrapper,
                borderTopRightRadius: item.owner ? 0 : 16,
                borderTopLeftRadius: !item.owner ? 0 : 16,
              }}
            >
              <Text style={styles.commentAuthor}>{item.comment}</Text>
              <Text
                style={{
                  ...styles.commentDate,
                  textAlign: item.owner ? "left" : "right",
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
