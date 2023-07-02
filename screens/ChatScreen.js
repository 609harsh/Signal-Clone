import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import {  } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  doc,
  serverTimestamp,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");
  const [send, setSend] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerBackTitleVisible: false,
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingVertical: 15,
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Avatar
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            size={40}
          />
          <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
            {route.params.data.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            width: 80,
            justifyContent: "space-around",
          }}
        >
          <Octicons name="device-camera-video" size={24} color="white" />
          <SimpleLineIcons name="call-out" size={24} color="white" />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const getData = async () => {
      console.log(route);
      const querySnapshot = await getDocs(
        collection(db, "chats", route.params.id, "message")
      );
      // const q = query(querySnapshot, orderBy("timeStamp"));
      let arr = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push({ id: doc.id, data: doc.data() });
      });
      arr.sort((a, b) => {
        let val = a.data.timeStamp;
        let val2 = b.data.timeStamp;
        return val - val2 ? -1 : 1;
      });
      setMessages(arr);
      console.log(querySnapshot, "43234234");
    };
    getData();
  }, [route, send]);

  const sendMessage = async () => {
    Keyboard.dismiss();
    try {
      const washingtonRef = doc(db, "chats", route.params.id);

      const docRef = await addDoc(collection(washingtonRef, "message"), {
        timeStamp: new Date().getTime(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoUrl: auth.currentUser.photoURL,
      });
      console.log("Document written with ID: ", docRef.id);
      setInput("");
      setSend(!send);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log("Done");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behaviour={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView>
              {messages &&
                messages.map((ele, idx) =>
                  ele.data.email === auth.currentUser.email ? (
                    <View key={ele.id} style={styles.reciever}>
                      <Avatar
                        position="absolute"
                        bottom={-10}
                        right={-5}
                        //web
                        containerStyle={{
                          position: "absolute",
                          bottom: -10,
                          right: -5,
                        }}
                        source={{ uri: ele.data.photoUrl }}
                        size={24}
                        rounded
                      />
                      <Text>{ele.data.message}</Text>
                    </View>
                  ) : (
                    <View key={ele.id} style={styles.sender}>
                      <Avatar
                        position="absolute"
                        bottom={-10}
                        left={-5}
                        //web
                        containerStyle={{
                          position: "absolute",
                          bottom: -10,
                          left: -5,
                        }}
                        source={{ uri: ele.data.photoUrl }}
                        size={24}
                        rounded
                      />
                      <Text>{ele.data.message}</Text>
                    </View>
                  )
                )}
            </ScrollView>
            <View style={styles.footer}>
              <MaterialCommunityIcons
                name="sticker-emoji"
                size={24}
                color="#F8D34F"
              />
              <View style={styles.textInput}>
                <TextInput
                  placeholder="Enter Message"
                  value={input}
                  onChangeText={(text) => setInput(text)}
                  selectionColor={"#3B5390"}
                />
              </View>

              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <FontAwesome name="send-o" size={24} color="#1048D5" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,

    paddingHorizontal: 10,
    // height: 10,
    borderTopWidth: 5,
    borderTopColor: "#969181",
    borderRadius: 10,
    width: "100%",
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    bottom: 0,
    height: 40,
    borderColor: "black",
    backgroundColor: "#D0D0D0",
    // borderWidth: 1,
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
  },
  reciever: {
    padding: 15,
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: 50,
    marginBottom: 10,
    maxWidth: "80%",
    alignSelf: "flex-end",
    gap: 10,
    marginRight: 10,
    backgroundColor: "#CBFFA9",
    borderRadius: 15,
    position: "relative",
  },
  sender: {
    padding: 15,
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: 50,
    marginBottom: 10,
    maxWidth: "80%",
    alignSelf: "flex-start",
    gap: 10,
    marginLeft: 10,
    backgroundColor: "#CBFFA9",
    borderRadius: 15,
    position: "relative",
  },
});
