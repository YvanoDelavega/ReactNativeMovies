import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import TMDBApi from "../API/TMDBApi";

export default function FilmItem({ film, displayFilmDetail }) {
  // console.log({ props.film });

  return (
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
  );
}

const styles = StyleSheet.create({
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
