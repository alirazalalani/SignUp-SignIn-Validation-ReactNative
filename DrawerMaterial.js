import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Title, Caption, Drawer, Paragraph } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/Ionicons";
const DrawerMaterial = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfo}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                size={50}
                source={{
                  uri: "https://images.pexels.com/photos/3466163/pexels-photo-3466163.jpeg?auto=compress&cs=tinysrgb&w=400",
                }}
              />
              <View style={{ marginLeft: 15 }}>
                <Title style={styles.title}>Aliraza Llani</Title>
                <Caption style={styles.caption}>@alirazalalani</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  800
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              onPress={() => {
                props.navigation.navigte("Home");
              }}
              label={"Home"}
              icon={() => {
                <FontAwesome5 name={"home"} size={24} color={"black"} light />;
              }}
            />
            <DrawerItem
              onPress={() => {
                props.navigation.navigte("About");
              }}
              label={"About"}
              icon={() => {
                <Icon
                  name={"person-outline"}
                  size={24}
                  color={"black"}
                  light
                />;
              }}
            />
            <DrawerItem
              onPress={() => {}}
              label={"Blog"}
              icon={() => {
                <FontAwesome5 name={"blog"} size={24} color={"black"} light />;
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          onPress={() => {}}
          label={"Sign-Out"}
          icon={({ size, color }) => (
            <Icon name="exit-outline" color={color} size={size} />
          )}
        />
      </Drawer.Section>
    </View>
  );
};
const styles = StyleSheet.create({
  userInfo: {
    paddingLeft: 20,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
});

export default DrawerMaterial;
