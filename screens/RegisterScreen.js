import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";

const RegisterScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const navigation = useNavigation();
  const register = () => {
    // const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: image,
        })
          .then(() => {
            console.log(user);
            // navigation.navigate("Login");
          })
          .catch((error) => {
            console.log(error);
            alert("helllll");
          });
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Hell");
        console.log(errorMessage);
      });
  };
  return (
    <KeyboardAvoidingView
      behaviour={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text h3 style={{ marginBottom: 50, fontSize: 30, fontWeight: "bold" }}>
        Create an Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          value={name}
          type="text"
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          value={email}
          type="email"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          value={password}
          secureTextEntry
          type="password"
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture(Optional)"
          value={image}
          type="text"
          onChangeText={(text) => setImage(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        raised
        title="Submit"
        onPress={() => register()}
        containerStyle={styles.button}
      />
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
    marginBottom: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
