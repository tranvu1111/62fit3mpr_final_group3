import React from "react";
import { Text, View, FlatList } from "react-native";

export default function LabelList({ labels }) {
  return (
    <View>
      <FlatList
        data={labels}
        numColumns={3}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 5,
              backgroundColor: "lightblue",
              marginRight: 5,
              borderRadius: 5,
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {item.label}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
