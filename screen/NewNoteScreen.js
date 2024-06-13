import React from "react";
import { Text, View, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { addNote } from "../database/actions";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function NewNoteScreen({ navigation }) {
  const dispatch = useDispatch();
  const [content, setContent] = React.useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: "white",
          elevation: 5,
          borderRadius: 10,
          borderWidth: 1,
          margin: 10,
        }}
      >
        <TextInput
          placeholder="Take a note..."
          multiline
          value={content}
          onChangeText={setContent}
        />
      </View>

      <Ionicons
        name="checkmark-circle"
        size={50}
        color={content ? "green" : "red"}
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
        onPress={() => {
          if (!content) {
            return;
          }
          dispatch(
            addNote({
              content,
            })
          );
          setContent("");
          navigation.goBack();
        }}
      />
    </View>
  );
}
