import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LabelList from "../components/LabelList";
import { formatUpdateAt } from "../utils/dateUtils";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { updateNote, deleteNote } from "../database/actions";

export default function EditNoteScreen({ route, navigation }) {
  const { note } = route.params;
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.labels);
  const noteFromStore = useSelector((state) =>
    state.notes.find((n) => n.id === note.id)
  );
  const [content, setContent] = useState(noteFromStore.content);
  const sheetRef = useRef(null);
  const colors = useSelector((state) => state.colors);
  const debounceTimeOut = useRef(null);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );
  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const getLabel = () => {
    const labelIds = noteFromStore.labelIds || [];
    return labelIds.map((labelId) =>
      labels.find((label) => label.id === labelId)
    );
  };

  const handleChangeContent = (content) => {
    setContent(content);
    clearTimeout(debounceTimeOut.current);
    debounceTimeOut.current = setTimeout(() => {
      const updatedNote = {
        ...noteFromStore,
        content,
        updateAt: new Date().toISOString(),
      };
      dispatch(updateNote(updatedNote));
    }, 300);
  };
  const handleChangeBookmark = () => {
    const updatedNote = {
      ...noteFromStore,
      isBookmarked: !noteFromStore.isBookmarked,
      updateAt: new Date().toISOString(),
    };
    dispatch(updateNote(updatedNote));
  };

  const handleColorChange = (color) => {
    const updatedNote = {
      ...noteFromStore,
      color: color === noteFromStore.color ? null : color,
      updateAt: new Date().toISOString(),
    };
    dispatch(updateNote(updatedNote));
  };
  const noteLabels = getLabel();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>
        <LabelList labels={noteLabels} />
        <TextInput
          style={{
            fontSize: 16,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            marginVertical: 10,
          }}
          multiline
          value={content}
          onChangeText={handleChangeContent}
        />
      </View>
      <View
        style={{
          backgroundColor: "gray",
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>
          Updated at: {formatUpdateAt(noteFromStore.updateAt)}
        </Text>
        <Ionicons
          name={noteFromStore.isBookmarked ? "bookmark" : "bookmark-outline"}
          size={30}
          color="white"
          onPress={handleChangeBookmark}
        />
        <Ionicons
          name="ellipsis-vertical-outline"
          size={30}
          color="white"
          onPress={() => {
            sheetRef.current?.expand();
          }}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        borderRadius={10}
        backdropComponent={renderBackdrop}
        onChange={(index) => console.log("snapped to index:", index)}
        enablePanDownToClose={true}
        enableDismissOnClose={false}
        style={{ borderRadius: 10, borderWidth: 1, borderColor: "gray" }}
      >
        <View style={{ backgroundColor: "white", height: "100%", padding: 10 }}>
          <FlatList
            horizontal
            data={colors}
            style={{ maxHeight: 70 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleColorChange(item)}>
                <View
                  style={{
                    backgroundColor: item || "white",
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    margin: 5,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  {item === null && (
                    <Ionicons
                      name="ban-outline"
                      size={32}
                      color="#ababab"
                      style={{ position: "absolute" }}
                    />
                  )}

                  {item === noteFromStore.color && (
                    <Ionicons name="checkmark" size={30} color="black" />
                  )}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <LabelList labels={noteLabels} />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#f0f0f0",
              marginRight: 5,
              marginBottom: 5,
            }}
            onPress={() => {
              navigation.navigate("ManageLabels", {
                noteId: noteFromStore.id,
              });
            }}
          >
            <Text
              style={{
                padding: 4,
                textAlign: "center",
              }}
            >
              +Manage labels
            </Text>
          </TouchableOpacity>
          <ScrollView
            style={{
              flex: 1,
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <Ionicons name="clipboard-outline" size={25} />
              <Text style={styles.textOption}>Copy to clipboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <Ionicons name="share-social-outline" size={25} />
              <Text style={styles.textOption}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                dispatch(deleteNote(noteFromStore));
                navigation.goBack();
              }}
            >
              <Ionicons name="trash" size={25} />
              <Text style={styles.textOption}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                Alert.alert("Copied to clipboard");
              }}
            >
              <Ionicons name="copy" size={25} />
              <Text style={styles.textOption}>Make a copy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <Ionicons name="pin-outline" size={25} />
              <Text style={styles.textOption}>Pin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <Ionicons name="alarm-outline" size={25} />
              <Text style={styles.textOption}>Create a reminder</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetOption: {
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  textOption: {
    marginLeft: 10,
    fontSize: 16,
  },
});
