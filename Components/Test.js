// Components/Test.js

import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import { Easing } from "react-native-reanimated";
//import HelloWorld from "./HelloWorld";
import HelloWorld from "./HelloWorld";

export default function Test() {
  const [topPosition, setTopPosition] = useState(new Animated.Value(0));
  const [leftPosition, setLeftPosition] = useState(new Animated.Value(0));
  
  const _getSize = () => {
    if (viewSize == 40) {
      return 80;
    }
    return 40;
  };
  
  const [viewSize, setviewSize] = useState(new Animated.Value(_getSize()));
  useEffect(() => {
    Animated.spring(viewSize, {
      toValue: 200,
      duration: 3000,
    }).start();

    // Animated.timing(topPosition, {
    //   toValue: 100,
    //   duration: 3000, // Le temps est en milliseconds ici (3000ms = 3sec)
    //   easing: Easing.linear,
    // }).start(); // N'oubliez pas de lancer votre animation avec la fonction start()
    // Animated.spring(topPosition, {
    //    toValue: 100,
    //     speed: 4,
    //     bounciness: 30
    // }).start(); // N'oubliez pas de lancer votre animation avec la fonction start()
    // Animated.decay(topPosition, {
    //   velocity: 0.8,
    //   deceleration: 0.997,
    // }).start();
    // Animated.sequence([
    //   Animated.spring(topPosition, {
    //     toValue: 100,
    //     duration: 1000,
    //     tension: 8,
    //     friction: 3,
    //   }),
    //   Animated.timing(topPosition, {
    //     toValue: 0,
    //     duration: 1000,
    //   }),
    // ]).start();
    // Animated.parallel([
    //   Animated.spring(topPosition, {
    //     toValue: 100,
    //     tension: 8,
    //     friction: 3,
    //   }),
    //   Animated.timing(leftPosition, {
    //     toValue: 100,
    //     duration: 1000,
    //     // easing: Easing.elastic(2), marce pas
    //   }),
    // ]).start();
  }, []);

  // var { height, width } = Dimensions.get("window");
  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: (evt, gestureState) => true,
  //   onPanResponderMove: (evt, gestureState) => {
  //     let touches = evt.nativeEvent.touches;
  //     if (touches.length == 1) {
  //       setTopPosition(touches[0].pageY - height / 2);
  //       setLeftPosition(touches[0].pageX - width / 2);
  //     }
  //   },
  // });

  return (
    <View style={styles.main_container}>
      <View style={styles.subview_container}></View>
      <HelloWorld></HelloWorld>

      <Animated.View
        style={[styles.animation_view, { width: viewSize, height: viewSize }]}
      ></Animated.View>
      {/* <Animated.View
        style={[
          styles.animation_view,
          { top: topPosition, left: leftPosition },
        ]}
      ></Animated.View> */}
      {/* <View
        {...panResponder.panHandlers}
        style={[
          styles.animation_view,
          { top: topPosition, left: leftPosition },
        ]}
      ></View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation_view: {
    backgroundColor: "red",
    width: 100,
    height: 100,
  },

  // Soit on utilise la fonction Platform.select
  subview_container: {
    ...Platform.select({
      ios: {
        backgroundColor: "red",
        height: 100,
        width: 50,
      },
      android: {
        backgroundColor: "blue",
        height: 50,
        width: 100,
      },
      // other platforms, web for example
      default: {
        backgroundColor: "green",
        height: 50,
        width: 100,
      },
    }),
  },
  // Soit on teste la valeur de l'OS
  //   subview_container: {
  //     backgroundColor: Platform.OS === "ios" ? "red" : "blue",
  //     height: Platform.OS === "ios" ? 100 : 50,
  //     width: Platform.OS === "ios" ? 50 : 100,
  //   },
});
