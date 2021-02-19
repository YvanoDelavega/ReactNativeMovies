import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function FilmDetail({route, navigation}) {

const { filmId } = route.params;

  return (
    <View style={styles.main_container}>
      {console.log(route)}
      <Text>coucou</Text>
      <Text>coucou {filmId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    //marginTop: 20,
   // backgroundColor: "gray",
  },
});