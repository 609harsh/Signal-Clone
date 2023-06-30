import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "../component/CustomListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "@rneui/base";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { SimpleLineIcons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState();
  const focus = useIsFocused();

  useEffect(() => {
    getDocs(collection(db, "chats")).then((querySnapshot) => {
      let arr = new Array();
      querySnapshot.forEach((doc) => {
        arr.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log(arr);
      setChats([...arr]);
    });
  }, [focus]);

  const signout = () => {
    signOut(auth)
      .then((res) => {
        alert("Signed Out");
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintcolor: "black",
      headerLeft: () => (
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={signout}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: 80,
            marginRight: 5,
          }}
        >
          <TouchableOpacity>
            <SimpleLineIcons name="camera" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons
              name="pencil"
              size={24}
              color="black"
              onPress={() => navigation.navigate("AddChat")}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, data) => {
    navigation.navigate("Chat", {
      id,
      data,
    });
  };

  return (
    <>
      <ScrollView>
        {chats &&
          chats?.map((ele) => (
            <CustomListItem
              key={ele.id}
              id={ele.id}
              data={ele.data}
              enterChat={enterChat}
            />
          ))}
        {/* <CustomListItem /> */}
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
