import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./screens/RootStackScreen";
import React, { useState, useEffect, useMemo, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "./component/context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import BookmarkScreen from "./screens/screensAfterSignin/BookmarkScreen";
import MainTabScreen from "./screens/screensAfterSignin/MainTabScreen";
import SettingsScreen from "./screens/screensAfterSignin/SettingsScreen";
import SupportScreen from "./screens/screensAfterSignin/SupportScreen";

const Tab = createMaterialBottomTabNavigator();
export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          isLoading: false,
          userName: action.id,
          userToken: action.token,
        };
      case "LOGOUT":
        return {
          ...prevState,
          isLoading: false,
          userName: null,
          userToken: null,
        };
      case "REGISTER":
        return {
          ...prevState,
          isLoading: false,
          userName: action.id,
          userToken: action.token,
        };
    }
  };
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (foundUser) => {
      // setIsLoading(false);
      // setUserToken("nsjaf");

      const userToken = String(foundUser.userToken);
      const userName = foundUser.userName;
      try {
        await AsyncStorage.setItem("userToken", userToken);
      } catch (e) {
        console.log(e);
      }

      console.log("user token is :", userToken);
      dispatch({ type: "LOGIN", id: userName, token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
      } catch (e) {
        console.log(e);
      }
      // setIsLoading(false);
      // setUserToken(null);
      dispatch({ type: "LOGOUT" });
    },
    signUp: () => {
      setIsLoading(false);
      setUserToken("nsjaf");
    },
  }));
  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken", userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Tab.Navigator
            initialRouteName="HomeDrawer"
            activeColor="white"
            inactiveColor="grey"
          >
            <Tab.Screen
              name="HomeDrawer"
              component={MainTabScreen}
              options={{
                tabBarIcon: () => (
                  <FontAwesome name={"home"} color={"white"} size={25} />
                ),
                tabBarColor: "green",
                tabBarLabel: "Home",
              }}
            />
            <Tab.Screen
              name="SupportScreen"
              component={SupportScreen}
              options={{
                tabBarIcon: () => (
                  <FontAwesome name={"phone"} color={"white"} size={25} />
                ),
                tabBarColor: "green",
                tabBarLabel: "Contact",
              }}
            />
            <Tab.Screen
              name="SettingsScreen"
              component={SettingsScreen}
              options={{
                tabBarIcon: () => (
                  <FontAwesome name={"suitcase"} color={"white"} size={25} />
                ),
                tabBarColor: "green",
                tabBarLabel: "Settings",
              }}
            />
            <Tab.Screen
              name="BookmarkScreen"
              component={BookmarkScreen}
              options={{
                tabBarIcon: () => (
                  <FontAwesome name={"lightbulb-o"} color={"white"} size={25} />
                ),
                tabBarColor: "green",
                tabBarLabel: "Bookmark",
              }}
            />
          </Tab.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
