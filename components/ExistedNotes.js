import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import LabelList from "./LabelList";
import { formatUpdateAt } from "../utils/dateUtils";
export default function ExistedNotes({ navigation, notes }) {
  const labels = useSelector((state) => state.labels);

  const getLabel = (note) => {
    const labelIds = note.labelIds || [];
    return labelIds.map((labelId) =>
      labels.find((label) => label.id === labelId)
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("EditNote", { note: item })}
            style={{
              elevation: 5,
              borderRadius: 10,
              backgroundColor: "white",
              margin: 10,
              padding: 10,
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
              {item.color && (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 10,
                    backgroundColor: item.color,
                    borderRadius: 50 / 2,
                  }}
                />
              )}
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                }}
              >
                {formatUpdateAt(item.updateAt.toString())}
              </Text>
              {item.isBookmarked && (
                <Ionicons size={24} name="bookmark" color={item.color} />
              )}
            </View>
            <LabelList labels={getLabel(item)} />
            <Text
              style={{
                marginTop: 5,
                fontSize: 16,
              }}
            >
              {item.content}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
