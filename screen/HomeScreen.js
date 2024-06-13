import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ExistedNotes from "../components/ExistedNotes";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
export default function HomeScreen({ navigation }) {
  const notes = useSelector((state) => state.notes);
  const labels = useSelector((state) => state.labels);
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  useEffect(() => {
    let filtered = notes;
    if (search !== "") {
      filtered = notes.filter((note) =>
        note.content.toLowerCase().includes(search.toLowerCase())
      );
    }
    filtered.sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt));
    setFilteredNotes(filtered);
  }, [notes, search, labels]);
  const [isSearching, setIsSearching] = useState(false);
  const status = () => {
    if (search === "") {
      if (notes.length === 0) {
        return <Text style={styles.statusText}>Please add a new note</Text>;
      }
      return <Text style={styles.statusText}>Total {notes.length} notes</Text>;
    } else {
      if (filteredNotes.length === 0) {
        return <Text style={styles.statusText}>Not found!</Text>;
      } else {
        return (
          <Text style={styles.statusText}>
            Found {filteredNotes.length}{" "}
            {filteredNotes.length >= 1 ? "note" : "notes"} match with {search}
          </Text>
        );
      }
    }
  };
  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearch("");
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name={isSearching ? null : "search"}
          size={24}
          color="black"
          style={{ marginRight: 10 }}
          onPress={toggleSearch}
        />
      ),
    });
  }, [navigation, isSearching]);
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingBottom: 5,
      }}
    >
      <View
        style={{
          flexDirection: isSearching ? "column" : "row",
        }}
      >
        {isSearching && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              borderWidth: 1,
              borderBottomColor: "black",
              margin: 10,
              borderRadius: 10,
            }}
          >
            <TextInput
              placeholder="Search"
              value={search}
              onChangeText={(text) => setSearch(text)}
              style={{
                fontSize: 16,
                flex: 1,
              }}
            />
            <Ionicons
              size={24}
              name="close"
              color="black"
              onPress={() => {
                setIsSearching(false);
                setSearch("");
              }}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          {status()}
        </View>
      </View>
      <ExistedNotes navigation={navigation} notes={filteredNotes} />
      <Ionicons
        name="add-circle"
        size={50}
        color="lightblue"
        style={{ position: "absolute", right: 20, bottom: 20 }}
        onPress={() => navigation.navigate("NewNote")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statusText: {
    fontSize: 16,
  },
});
