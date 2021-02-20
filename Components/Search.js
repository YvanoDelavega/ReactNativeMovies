import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
//import films from "../Helpers/filmsData";
// import FilmItems from "./FilmItem";
import API from "../API/TMDBApi";
import { connect } from "react-redux";
import FilmsList from "./FilmsList";

function Search({ navigation, favoriteFilms }) {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let _searchText = useRef("");
  var _page = useRef(0);
  var _totalPages = useRef(0);
  const _loadfilms = (clear = false) => {
    console.log("_loadfilms " + parseInt(_page.current + 1, 10));
    //console.log(_page.current + 1);
    //setFilms([]);
    if (_searchText.current.length > 0) {
      setIsLoading(true);
      API.getFilmsFromApiWithSearchedText(
        _searchText.current,
        _page.current + 1
      )
        .then((data) => {
          _page.current = data.page;
          _totalPages.current = data.total_pages;
          //console.log(data);
          console.log(_page.current);
          console.log(_totalPages.current);
          // setFilms(data.results);
          if (clear) setFilms(data.results);
          else setFilms([...films, ...data.results]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const _showLoading = () => {
    // console.log(isLoading);
    if (isLoading)
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
  };

  const _searchFilms = () => {
    _page.current = 0;
    _totalPages.current = 0;
    //setFilms([]).then(() => _loadfilms());
    //setFilms([], () => _loadfilms());
    _loadfilms(true);
  };

  const _displayFilmDetail = (filmId) => {
    console.log("show detail " + filmId);
    navigation.navigate("FilmDetail", { filmId: filmId });
  };

  const onChangeSearchText = (text) => {
    _searchText.current = text;
    setFilms([]);
  };

  const _loadNextFilms = () => {
    if (_page.current < _totalPages.current) _loadfilms();
    else {
      console.log(_page.current);
      console.log(_totalPages.current);
      console.log(_page.current < _totalPages.current);
    }
  };


  /* pour debug uniquement */
  useEffect(() => {
    _searchText.current = "star";
    _searchFilms();
  }, []);

  return (
    <View style={styles.main_container}>
      {console.log(favoriteFilms)}
      <TextInput
        onSubmitEditing={() => _searchFilms()}
        onChangeText={(text) => onChangeSearchText(text)}
        style={styles.textinput}
        placeholder="Titre du film"
      />
      <Button
        style={styles.btnSearch}
        title="Rechercher"
        onPress={() => {
          _searchFilms();
        }}
      />
      <Button
        width="200"
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert("Button with adjusted color pressed")}
      />
      {console.log("render films")}

      <FilmsList
        films={films}
        favoriteFilms={favoriteFilms}
        navigation={navigation}
        loadNextFilms={() => _loadNextFilms()}
      ></FilmsList>

      {/* <FlatList
        data={films}
        extraData={favoriteFilms}
        // onEndReachedThreshold={0.5}
        // onEndReached={() => {
        //   console.log("endreached");
        //   if (_page.current < _totalPages.current) _loadfilms();
        //   else {
        //     console.log(_page.current);
        //     console.log(_totalPages.current);
        //     console.log(_page.current < _totalPages.current);
        //   }
        // }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FilmItems
            film={item}
            favoriteFilms={favoriteFilms}
            isFilmFavori={
              favoriteFilms.findIndex((film) => film.id === item.id) >= 0
            }
            displayFilmDetail={_displayFilmDetail}
          ></FilmItems>
        )}
      /> */}
      {_showLoading()}
    </View>
  );



}



// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.favoriteFilms,
  };
};

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    //marginTop: 20,
    // backgroundColor: "gray",
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 200,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    // width: 200,
    //  height: 200,
    //  backgroundColor: "blue",
  },
  btnSearch: {
    backgroundColor: "red",
    color: "#f194ff",
    // width: 200,
    //height: 100,
  },

  textinput: {
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    //  width: 200,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },
});
