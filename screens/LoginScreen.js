import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input, Image } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
const LoginScreen = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const navigation = useNavigation();
  // console.log(email);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        navigation.navigate("Home");
        // ...
      } else {
        // User is signed out
        // ...
        // console.log("error");
      }
    });
  }, []);
  const signin = () => {
    // const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        // console.log(user);
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Err");
        // console.log(errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={{ padding: 15 }}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png?20201126050550",
          }}
          style={{
            height: 150,
            width: 150,
            borderRadius: 15,
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autofocus
          type="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button
        title="Login"
        buttonStyle={{
          backgroundColor: "rgba(78, 116, 289, 1)",
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          // marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => signin()}
      />
      <Button
        title="Register"
        buttonStyle={{
          borderColor: "rgba(78, 116, 289, 1)",
        }}
        type="outline"
        titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
        containerStyle={{
          width: 200,
          // marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate("Register")}
      />
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  inputContainer: {
    width: 300,
  },
});
