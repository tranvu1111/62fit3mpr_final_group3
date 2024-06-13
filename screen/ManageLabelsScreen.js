import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../database/actions";
import { se } from "date-fns/locale";
export default function LabelManage({ navigation, route }) {
  const [search, setSearch] = useState("");
  const { noteId } = route.params;
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.labels);
  const note = useSelector((state) => state.notes.find((n) => n.id === noteId));
  const [filteredLabels, setFilteredLabels] = useState([]);
  useEffect(() => {
    if (search === "") {
      setFilteredLabels(labels);
      return;
    }
    const filtered = labels.filter((label) =>
      label.label.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLabels(filtered);
  }, [search, labels]);
  return (
    <View>
      <TextInput
        style={{
          padding: 10,
          margin: 5,
          borderRadius: 5,
          elevation: 5,
          backgroundColor: "white",
        }}
        placeholder="Search label"
        value={search}
        onChangeText={setSearch}
      />
      {search === "" ? (
        <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
          {labels.length} labels, {note.labelIds.length} selected
        </Text>
      ) : (
        <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
          {filteredLabels.length} labels match with {search}
        </Text>
      )}
      <FlatList
        data={filteredLabels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: note.labelIds.includes(item.id)
                ? "blue"
                : "lightblue",
              margin: 5,
              borderRadius: 5,
              elevation: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              const labelIds = note.labelIds.includes(item.id)
                ? note.labelIds.filter((id) => id !== item.id)
                : [...note.labelIds, item.id];
              const updatedNote = {
                ...note,
                labelIds,
                updateAt: new Date().toISOString(),
              };
              dispatch(updateNote(updatedNote));
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: note.labelIds.includes(item.id) ? "white" : "black",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
