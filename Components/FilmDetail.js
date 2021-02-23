import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import API from "../API/TMDBApi";
import { connect } from "react-redux";
import EnlargeShrink from "../Animations/EnlargeShrink";

function FilmDetail({ route, navigation, favoriteFilms, dispatch }) {
  const { filmId } = route.params;
  const [film, setFilm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const _shareFilm = (film) => {
    if (film) Share.share({ title: film.title, message: film.overview });
  };

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

  const _displayFloatingActionButton = () => {
    if (
      (film != undefined && Platform.OS === "android") ||
      Platform.OS === "web"
    ) {
      // Uniquement sur Android et lorsque le film est chargé
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => _shareFilm(film)}
        >
          <Image
            style={styles.share_image}
            source={require("../Images/ic_share.android.png")}
          />
        </TouchableOpacity>
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const data = API.GetMovieFromId(filmId).then((data) => {
      setFilm(data);
      () => _updateNavigationParams();
      setIsLoading(false);
      return data;
    });
  }, []);

  //React.useLayoutEffect(() => {
  useEffect(() => {
    console.log("vav " + film.title);
    if (
      Platform.OS === "ios" ||
      Platform.OS === "android" ||
      Platform.OS === "web"
    ) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.share_touchable_headerrightbutton}
            onPress={() => _shareFilm(film)}
          >
            <Image
              style={styles.share_image}
              source={require("../Images/ic_share.ios.png")}
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [film]);

  const _toggleFavorite = () => {
    const action = { type: "TOOGLE_FAVORITE", value: film };
    dispatch(action);
  };

  // const _displayFavoriteImage = () => {
  //   const isInFavorite = favoriteFilms.findIndex((f) => f.id === film.id) >= 0;
  //   const sourceImage = isInFavorite
  //     ? require("../Images/favorite.png")
  //     : require("../Images/favorite_border.png");
  //   return <Image source={sourceImage} style={styles.favorite_image} />;
  // };
  const _displayFavoriteImage = () => {
    var sourceImage = require("../Images/favorite_border.png");
    var shouldEnlarge = false; // Par défaut, si le film n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge à true
    if (favoriteFilms.findIndex((item) => item.id === film.id) !== -1) {
      sourceImage = require("../Images/favorite.png");
      shouldEnlarge = true; // Si le film est dans les favoris, on veut qu'au clic sur le bouton, celui-ci se rétrécisse => shouldEnlarge à false
    }
    return (
      // <Image style={styles.favorite_image} source={sourceImage} />
      <EnlargeShrink shouldEnlarge={shouldEnlarge}>
        <Image style={styles.favorite_image} source={sourceImage} />
      </EnlargeShrink>
    );
  };

  return (
    <View style={styles.test_container}>
      <ScrollView style={styles.scrollview_container}>
        <View style={styles.image_container}>
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
            {_displayFavoriteImage()}
          </TouchableOpacity>

          <Text style={styles.description_text}>{film.overview}</Text>
        </View>
        <View style={styles.detail_container}>
          <Text style={styles.detail_text}>
            Sorti le :{" "}
            {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.detail_text}>
            Note : {film.vote_average} / 10
          </Text>
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
      <View style={styles.bottom}>{_displayFloatingActionButton()}</View>
      {/* {_displayFloatingActionButton()} */}
    </View>
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
  return {favoriteFilms: state.tooggleFavoriteReducer.favoriteFilms};
};
export default connect(mapStateToProps)(FilmDetail);

const styles = StyleSheet.create({
  test_container: {
    flex: 1,
    //flexDirection:"row",
    justifyContent: "flex-end",
    //marginBottom: 326,
    //alignItems: "flex-end",
    //marginTop: 20,
    // backgroundColor: "gray",
  },
  image_container: {
    flex: 1,
    //marginTop: 20,
    // backgroundColor: "gray",
  },
  favorite_container: {
    alignItems: "center",
  },
  //favorite_image: { width: 40, height: 40 },
  favorite_image: { flex: 1, width: null, height: null },

  main_container: {
    flex: 1,
    // backgroundColor: "yellow",
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
  bottom: {
    // flexDirection: "row",
    backgroundColor: "#FFFFFF",
    //flex: 1,
    justifyContent: "flex-end",
    //width:60,
    height: 1,
    //marginBottom: 326,
    //top: 150,
    alignItems: "flex-end",
    //position: "absolute",
  },
  share_touchable_floatingactionbutton: {
    // position: "absolute",
    width: 60,
    height: 60,
    top: -10,
    left: -10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#e91e63",
    /* width: 100,
    height: 100,
    position: "absolute",
    top: -50,
    left: -50,
    backgroundColor: "#5ca5cc",
    borderRadius: 30,*/
  },
  share_image: {
    width: 30,
    height: 30,
  },

  share_touchable_headerrightbutton: {
    marginRight: 8,
  },
});
