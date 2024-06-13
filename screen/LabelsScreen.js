import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "react-native-dialog";
import {
  addLabel,
  updateLabel,
  deleteLabel,
  updateNote,
} from "../database/actions";

export default function LabelsScreen() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.labels);
  const notes = useSelector((state) => state.notes);
  const trash = useSelector((state) => state.trash);
  const [filteredLabels, setFilteredLabels] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [chosenLabel, setChosenLabel] = useState(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (search === "") {
      setFilteredLabels(labels);
    } else {
      const filtered = labels.filter((label) =>
        label.label.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredLabels(filtered);
    }
  }, [search, labels]);

  const handleAddLabel = () => {
    const newLabel = {
      id: Date.now().toString(),
      label: search,
    };
    dispatch(addLabel(newLabel));
    setSearch("");
  };

  const handleOpenDialog = (label) => {
    setChosenLabel(label);
    setLabel(label.label);
    setIsDialogVisible(true);
  };
  const handleDeleteLabel = async () => {
    if (!chosenLabel) return; // Add null check

    try {
      await Promise.all(
        notes.map(async (note) => {
          if (note.labelIds && note.labelIds.includes(chosenLabel.id)) {
            dispatch(
              updateNote({
                ...note,
                labelIds: note.labelIds.filter((id) => id !== chosenLabel.id),
              })
            );
          }
        })
      );

      await Promise.all(
        trash.map(async (note) => {
          if (note.labelIds && note.labelIds.includes(chosenLabel.id)) {
            dispatch(
              updateNote({
                ...note,
                labelIds: note.labelIds.filter((id) => id !== chosenLabel.id),
              })
            );
          }
        })
      );
      console.log(trash);
      dispatch(deleteLabel(chosenLabel));
      setIsDialogVisible(false);
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search label or create new label"
        value={search}
        onChangeText={setSearch}
      />
      {search === "" ? (
        <Text style={styles.boldText}>
          Total {labels.length} {labels.length === 1 ? "label" : "labels"}
        </Text>
      ) : (
        <View>
          <Text style={styles.boldText}>
            {filteredLabels.length} labels match with "{search}"
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddLabel}>
            <Text style={styles.addButtonText}>
              + Create label name "{search}"
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={filteredLabels}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.labelItem}
            onPress={() => handleOpenDialog(item)}
          >
            <Text
              style={{
                color: "lightblue",
                fontWeight: "bold",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
      {chosenLabel && (
        <Dialog.Container visible={isDialogVisible}>
          <Dialog.Input value={label} onChangeText={setLabel} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Dialog.Button
              label="Save"
              color="black"
              onPress={() => {
                dispatch(
                  updateLabel({
                    ...chosenLabel,
                    label,
                  })
                );
                setIsDialogVisible(false);
              }}
            />
            <Dialog.Button
              label="Delete"
              onPress={handleDeleteLabel}
              color="red"
            />
          </View>
        </Dialog.Container>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "white",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
  addButton: {
    borderRadius: 5,
    margin: 5,
  },
  addButtonText: {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  },
  labelItem: {
    padding: 10,
    margin: 5,
    backgroundColor: "blue",
    borderBottomColor: "gray",
    elevation: 5,
    borderRadius: 5,
  },
});
