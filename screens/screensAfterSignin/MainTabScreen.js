import { StyleSheet, Text, View, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../component/context";
const MainTabScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button
        title="SignOut"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default MainTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
