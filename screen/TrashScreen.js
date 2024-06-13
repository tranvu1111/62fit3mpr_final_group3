import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { restoreNote, deleteForever, emptyTrash } from "../database/actions";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formatUpdateAt } from "../utils/dateUtils";
import LabelList from "../components/LabelList";
import Dialog from "react-native-dialog";

export default function TrashScreen() {
  const dispatch = useDispatch();
  const trash = useSelector((state) => state.trash);
  const [selectedTrash, setSelectedTrash] = useState(null);
  const [displayedTrash, setDisplayedTrash] = useState(trash);
  const labels = useSelector((state) => state.labels);

  const getLabel = (note) => {
    const labelIds = note.labelIds || [];
    return labelIds.map((labelId) => {
      const label = labels.find((label) => label.id === labelId);
      return label ? label : null; // Return null if label is undefined
    });
  };

  useEffect(() => {
    const sortedTrash = trash.sort(
      (a, b) => new Date(b.updateAt) - new Date(a.updateAt)
    );
    setDisplayedTrash(sortedTrash);
  }, [trash]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          {trash.length} {trash.length > 1 ? "items" : "item"} in Trash
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              marginRight: 10,
            }}
          >
            <Button
              title="Restore"
              onPress={() => {
                trash.forEach((note) => {
                  dispatch(restoreNote(note));
                });
              }}
              color={"gray"}
            />
          </View>

          <Button
            title="Empty"
            onPress={() => dispatch(emptyTrash())}
            color={"red"}
          />
        </View>
      </View>
      <FlatList
        data={displayedTrash}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedTrash(item);
            }}
            style={{
              backgroundColor: "white",
              margin: 10,
              padding: 10,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ flex: 1 }}>
                {formatUpdateAt(item.updateAt.toString())}
              </Text>

              {item.isBookmarked && (
                <Ionicons size={24} name="bookmark" color={item.color} />
              )}
            </View>
            <LabelList labels={getLabel(item)} />
            <Text style={{ marginTop: 5 }}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />
      <Dialog.Container visible={selectedTrash !== null}>
        <View>
          <Dialog.Button
            color={"blue"}
            label="Restore"
            onPress={() => {
              dispatch(restoreNote(selectedTrash));
              setSelectedTrash(null);
            }}
          />
          <Dialog.Button
            color={"red"}
            label="Delete permanently"
            onPress={() => {
              dispatch(deleteForever(selectedTrash));
              setSelectedTrash(null);
            }}
          />
        </View>
      </Dialog.Container>
    </View>
  );
}
