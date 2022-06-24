import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
const SigninScreen = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputChange = (value) => {
    if (value.length !== 0) {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textInputChange: false,
      });
    }
  };
  const handlePassword = (value) => {
    setData({
      ...data,
      password: value,
    });
  };
  const handleConfrimPassword = (value) => {
    setData({
      ...data,
      confirm_password: value,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const B = (props) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#009387"} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textStyle}>Register Now!</Text>
      </View>
      <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={"#05375a"} size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize={"none"}
            onChangeText={(value) => {
              textInputChange(value);
            }}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation={"bounceIn"}>
              <Feather color={"green"} name="check-circle" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color={"#05375a"} size={20} />
          <TextInput
            placeholder="Your Password"
            style={styles.textInput}
            autoCapitalize={"none"}
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(value) => {
              handlePassword(value);
            }}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            <Feather
              color={"grey"}
              name={data.secureTextEntry ? "eye-off" : "eye"}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>
          Confirm Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={"#05375a"} size={20} />
          <TextInput
            placeholder="Confirm Your Password"
            style={styles.textInput}
            autoCapitalize={"none"}
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            onChangeText={(value) => {
              handleConfrimPassword(value);
            }}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            <Feather
              color={"grey"}
              name={data.confirm_secureTextEntry ? "eye-off" : "eye"}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.privacy_text}>
          By signing up you are agree to our <B>Terms of service</B> and{" "}
          <B>Privacy policy</B>
        </Text>
        <View style={styles.button}>
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
            <Text style={[styles.textSign, { color: "white" }]}>Sign Up</Text>
          </LinearGradient>
          <TouchableOpacity
            style={[
              styles.signIn,
              { borderColor: "#009387", borderWidth: 1, marginTop: 15 },
            ]}
            onPress={() => {
              props.navigation.navigate("SignIn");
            }}
          >
            <Text style={[styles.textSign, { color: "#009387" }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    justifyContent: "flex-end",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS == "ios" ? 0 : -12,
    marginLeft: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 20,
    fontWeight: "bold",
  },
  privacy_text: {
    marginTop: 12,
    color: "grey",
  },
});
