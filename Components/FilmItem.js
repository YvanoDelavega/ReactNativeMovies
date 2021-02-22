import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FadeIn from "../Animations/Fadein";
import TMDBApi from "../API/TMDBApi";

export default function FilmItem({
  film,
  displayFilmDetail,
  extraData,
  isFilmFavori,
  //favoriteFilms,
}) {
  // console.log({ props.film });

  const _displayFavoriteImage = () => {
    //if (favoriteFilms && favoriteFilms.findIndex((f) => f.id === film.id) >= 0)
    if (isFilmFavori)
      return (
        <Image
          source={require("../Images/favorite.png")}
          style={styles.favorite_image}
        />
      );
  };

  return (
    <FadeIn>
      <TouchableOpacity
        onPress={() => displayFilmDetail(film.id)}
        style={styles.main_container}
      >
        <Image
          style={styles.image}
          source={{ uri: TMDBApi.GetImageUrlFromApi(film.poster_path) }}
        ></Image>

        <View style={styles.data_container}>
          <View style={styles.header_container}>
            {_displayFavoriteImage()}
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>
              {film.overview}
            </Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  favorite_image: { width: 20, height: 20, margin: 5 },
  main_container: {
    flex: 1,
    marginTop: 4,
    height: 190,
    flexDirection: "row",
    backgroundColor: "blue",
  },

  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray",
  },

  data_container: {
    flex: 1,
    backgroundColor: "cyan",
    margin: 5,
  },

  header_container: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "red",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },

  description_container: {
    flex: 7,
  },
  description_text: {},

  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
});
