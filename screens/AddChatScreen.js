import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "@rneui/themed";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
// import db from "firebase/firestore";
const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        chatName: input,
      });

      console.log("Document written with ID: ", docRef.id);
      navigation.goBack();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter new chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={<Ionicons name="md-chatbubbles" size={24} color="black" />}
      />
      <Button raised title="Create new Chat" onPress={() => createChat()} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    backgroundColor: "white",

    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});
