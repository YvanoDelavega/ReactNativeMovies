import React from "react";
import { Text, View } from "react-native";
import FilmsList from "./FilmsList";
import { connect } from "react-redux";

function Favorites({ navigation, favoriteFilms }) {
  return (
    <View>
      {/* {console.log(favoriteFilms)} */}
      <Text>Mes favoris</Text>
      <FilmsList
        films={favoriteFilms}
        favoriteFilms={favoriteFilms}
        navigation={navigation}
      ></FilmsList>
    </View>
  );
}

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.favoriteFilms,
  };
};

export default connect(mapStateToProps)(Favorites);
