import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Search from "./Components/Search";
// import Navigation from "./Navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FilmDetail from "./Components/FilmDetail";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import Favorites from "./Components/Favorites";
import Test from "./Components/Test";

const Stack = createStackNavigator();

// https://reactnavigation.org/docs/tab-based-navigation
const TabNav = createBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="FilmDetail" component={FilmDetail} />
    </Stack.Navigator>
  );
}

function Favoris() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="FilmDetail" component={FilmDetail} />
    </Stack.Navigator>
  );
}

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
        {/* <Stack.Navigator>
          <TabNav.Screen
            name="Search"
            component={Search}
            options={{ title: "Rechercher" }}
          />
          <Stack.Screen
            name="FilmDetail"
            component={FilmDetail}
            options={{ title: "Détail du film" }}
          />
        </Stack.Navigator> */}
        <TabNav.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let source;

              if (route.name === "Home" || route.name === "Test") {
                source = focused ? require("./Images/search.png") : require("./Images/search.png");
              } else if (route.name === "Favoris") {
                source = focused
                  ? require("./Images/favorite.png")
                  : require("./Images/favorite_border.png");
              }

              // You can return any component that you like here!
              // return <Ionicons name={iconName} size={size} color={color} />;
              return <Image source={source} style={styles.icon} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
            activeBackgroundColor: "#DDDDDD", // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: "#FFFFFF", // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            // showIcon: false, // On informe le TabNavigator qu'on souhaite afficher les icônes définis
          }}
        >
          {/* <TabNav.Screen
            name="Test"
            component={Test}
            options={{ title: "Rechercher" }}
          /> */}

          <TabNav.Screen
            name="Home"
            component={Home}
            options={{ title: "Rechercher" }}
          />

          <TabNav.Screen
            name="Favoris"
            component={Favoris}
            options={{ showLabel: false, title: "Mes favoris" }}
          />
        </TabNav.Navigator>
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
  icon: {
    width: 30,
    height: 30,
  },
});
