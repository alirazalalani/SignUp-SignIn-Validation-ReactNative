import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../component/context";
import Users from "../model/user";
const SigninScreen = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { signIn } = useContext(AuthContext);

  const textInputChange = (value) => {
    if (value.trim().length >= 4) {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  const handlePassword = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const handleValidUser = (value) => {
    if (value.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter((item) => {
      return userName == item.username && password == item.password;
    });
    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert("Wrong Input", "Username or password field cannot be empty", [
        { text: "Okay" },
      ]);
      return;
    }
    if (foundUser.length === 0) {
      Alert.alert("Invalid User", "Username or passeord is  incorrect.", [
        { text: "Okay" },
      ]);
      return;
    }
    signIn(foundUser);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#009387"} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textStyle}>Welcome!</Text>
      </View>
      <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>
        <Text style={styles.text_footer}>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={"#05375a"} size={20} />
          <TextInput
            placeholder="Your Username"
            style={styles.textInput}
            autoCapitalize={"none"}
            onChangeText={(value) => {
              textInputChange(value);
            }}
            onEndEditing={(e) => {
              handleValidUser(e.nativeEvent.text);
            }}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation={"bounceIn"}>
              <Feather color={"green"} name="check-circle" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation={"fadeInLeft"} duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}
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
        {data.isValidPassword ? null : (
          <Animatable.View animation={"fadeInLeft"} duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
        <Text style={styles.forgotPass}>Forget password?</Text>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.email, data.password);
            }}
          >
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "white" }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.signIn,
              { borderColor: "#009387", borderWidth: 1, marginTop: 15 },
            ]}
            onPress={() => {
              props.navigation.navigate("SignUp");
            }}
          >
            <Text style={[styles.textSign, { color: "#009387" }]}>Sign Up</Text>
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
  errorMsg: {
    color: "red",
  },
  forgotPass: {
    color: "#009387",
    fontWeight: "bold",
    marginTop: 4,
  },
});
