import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Search from "./Components/Search";
// import Navigation from "./Navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FilmDetail from "./Components/FilmDetail";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";

const Stack = createStackNavigator();
export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    // <Search></Search>
    // <Navigation />
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ title: "Rechercher" }}
          />
          <Stack.Screen
            name="FilmDetail"
            component={FilmDetail}
            options={{ title: "Détail du film" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
