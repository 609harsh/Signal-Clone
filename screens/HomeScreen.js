import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import CustomListItem from "../component/CustomListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "@rneui/base";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
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
    });
  }, []);
  return (
    <>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
