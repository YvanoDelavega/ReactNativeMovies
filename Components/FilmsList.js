import React from "react";
import { StyleSheet } from "react-native";
// import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
// import { connect } from "react-redux";
import FilmItems from "./FilmItem";


export default function FilmsList({ navigation, films, favoriteFilms, loadNextFilms }) {

    const _displayFilmDetail = (filmId) => {
      console.log("show detail " + filmId);
      navigation.navigate("FilmDetail", { filmId: filmId });
    };


    return (
    <FlatList
      style={styles.list}
      data={films}
      extraData={favoriteFilms}
      onEndReachedThreshold={0.5}
      // onEndReached={() => {
      //   console.log("endreached");
      //   if (_page.current < _totalPages.current) _loadfilms();
      //   else {
      //     console.log(_page.current);
      //     console.log(_totalPages.current);
      //     console.log(_page.current < _totalPages.current);
      //   }
      // }}
      onEndReached={loadNextFilms}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <FilmItems
          film={item}
          //   favoriteFilms={favoriteFilms}
          isFilmFavori={
            favoriteFilms.findIndex((film) => film.id === item.id) >= 0
          }
          displayFilmDetail={(filmId) => {
            _displayFilmDetail(filmId);
          }}
        ></FilmItems>
      )}
    />
  );
}


const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});