import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FilmsList from "./FilmsList";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import FilmItems from "./FilmItem";

function Favorites({ navigation, favoriteFilms }) {
  return (
    <View style={styles.main_container}>
      {/* <Text>Mes favoris</Text> */}
      <FilmsList
        films={favoriteFilms}
        favoriteFilms={favoriteFilms}
        navigation={navigation}
      ></FilmsList>
    </View>
  );
}


const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
});

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.favoriteFilms,
  };
};

export default connect(mapStateToProps)(Favorites);
