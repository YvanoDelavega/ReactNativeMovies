import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import API from "../API/TMDBApi";

export default function FilmDetail({ route, navigation }) {
  const { filmId } = route.params;
  const [film, setFilm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const _showLoading = () => {
    if (isLoading)
      return (
        <View>
          <ActivityIndicator
            style={{ marginTop: 50 }}
            size="large"
          ></ActivityIndicator>
        </View>
      );
  };

  useEffect(() => {
    setIsLoading(true);
    const data = API.GetMovieFromId(filmId).then((data) => {
      console.log(data);
      setFilm(data);
      setIsLoading(false);
      return data;
    });
  }, []);

  return (
    <ScrollView style={styles.scrollview_container}>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={{ uri: API.GetImageUrlFromApi(film.backdrop_path) }}
        ></Image>
      </View>
      <View style={styles.main_container}>
        <Text style={styles.title}>{film.title}</Text>
        <Text style={styles.description_text}>{film.overview}</Text>
      </View>
      <View style={styles.detail_container}>
        <Text style={styles.detail_text}>
          Sorti le : {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
        </Text>
        <Text style={styles.detail_text}>Note : {film.vote_average} / 10</Text>
        <Text style={styles.detail_text}>
          Nombre de votes : {film.vote_count}
        </Text>
        <Text style={styles.detail_text}>
          Budget : {numeral(film.budget).format("0,0[.]00 $")}
        </Text>
        {console.log(film.genres)}
        <Text style={styles.detail_text}>
          Genres(s) :{" "}
          {film.genres ? film.genres.map((x) => x.name).join(" / ") : ""}
        </Text>
        <Text style={styles.detail_text}>
          Compagnie(s) :{" "}
          {film.production_companies
            ? film.production_companies.map((x) => x.name).join(" / ")
            : ""}
        </Text>
      </View>
      {_showLoading()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image_container: {
    flex: 1,
    //marginTop: 20,
    // backgroundColor: "gray",
  },
  main_container: {
    flex: 1,
  //  backgroundColor: "yellow",
    alignItems: "center",
    //marginTop: 20,
    // backgroundColor: "gray",
  },
  detail_container: {
    flex: 1,
   // backgroundColor: "red",
   marginTop:10,
    margin: 4,
    //marginTop: 20,
    // backgroundColor: "gray",
  },
  image: {
    height: 180,
    backgroundColor: "gray",
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 26,
    margin: 10,
    color: "black",
  },
  description_text: {
    fontSize: 16,
    margin: 4,
    fontStyle: "italic",
    color: "#666666",
},
detail_text: {
    flex: 1,
    fontSize: 14,
    color: "black",
  },
  scrollview_container: {
    flex: 1,
   // backgroundColor: "blue",
  },
});
