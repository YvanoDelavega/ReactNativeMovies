import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import API from "../API/TMDBApi";
import { connect } from "react-redux";

function FilmDetail({ route, navigation, favoriteFilms, dispatch }) {
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
      // console.log(data);
      setFilm(data);
      setIsLoading(false);
      return data;
    });
  }, []);

  const _toggleFavorite = () => {
    const action = { type: "TOOGLE_FAVORITE", value: film };
    dispatch(action);
  };

  const _displayFavoriteImage = () => {
    const isInFavorite = favoriteFilms.findIndex((f) => f.id === film.id) >= 0;
    const sourceImage = require("../Images/" + (isInFavorite
      ? "favorite.png"
      : "favorite_border.png"));
    return <Image source={sourceImage} style={styles.favorite_image} />;
  };



  return (
    <ScrollView style={styles.scrollview_container}>
      {console.log("favoriteFilms")}
      <View style={styles.image_container}>
        {console.log(favoriteFilms)}
        <Image
          style={styles.image}
          source={{ uri: API.GetImageUrlFromApi(film.backdrop_path) }}
        ></Image>
      </View>
      <View style={styles.main_container}>
        <Text style={styles.title}>{film.title}</Text>
        
        <TouchableOpacity
          style={styles.favorite_container}
          onPress={() => _toggleFavorite()}
        >
          <View style={styles.main_container}>{_displayFavoriteImage()}</View>
        </TouchableOpacity>

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
        {/* {console.log(film.genres)} */}
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

// permet de connecter/mapper le state global aux props de notre component
/**
 *
 * @param {[mapStateToProps(state, [ownProps]): stateProps] (Function): If this argument is specified, the new component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the component’s props.} state
 */
/*
On aurait pu simplifier le code pour connecter le store à notre component en écrivant simplement : 

export default connect(state => state)(FilmDetail)

Cela revient exactement au même que ce que l'on a fait avec la constante  mapStateToProps  . Personnellement, je n'aime pas cette syntaxe, car, à moins de bien connaître Redux, une personne qui reprend votre code va se dire :

    "OK, là, il connecte le state de l'application avec le state du component FilmDetail."

Ce n'est pas du tout le cas ici. On connecte le state de l'application avec les props du component FilmDetail. */
const mapStateToProps = (state) => {
  //return state -> connecterai tout le state global, mais nous on ne veux que les filmfavoris
  return { favoriteFilms: state.favoriteFilms };
};
export default connect(mapStateToProps)(FilmDetail);

const styles = StyleSheet.create({
  image_container: {
    flex: 1,
    //marginTop: 20,
    // backgroundColor: "gray",
  },
  favorite_container: {
    alignItems: "center",
  },
  favorite_image: { width: 40, height: 40 },
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
    marginTop: 10,
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
