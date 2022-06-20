import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./SplashScreen";
import SigninScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";
const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignIn" component={SigninScreen} />
      <RootStack.Screen name="SignUp" component={SignupScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
