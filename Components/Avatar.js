// Components/Avatar.js

import React, {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
//  import ImagePicker from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import {launchImageLibrar, launchCamera} from 'react-native-image-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function Avatar({dispatch, avatar}) {
  //const [avatar, setAvatar] = useState(require('../Images/ic_tag_faces.png'));

  const _avatarClicked = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = {uri: res.uri};
        //  let requireSource = {uri: response.uri};
        //   this.setState({
        //     avatar: requireSource,
        //   });
        //setAvatar(source);
        // On crée une action avec l'image prise et on l'envoie au store Redux
        const action = {type: 'SET_AVATAR', value: source};
        dispatch(action);
        //   console.log('response', JSON.stringify(res));
        // this.setState({
        //   filePath: res,
        //   fileData: res.data,
        //   fileUri: res.uri,
        // });
      }
    });
  };
  const _avatarClicked0 = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    console.log('coucou0');
    // var ImagePicker = require('react-native-image-picker');
    //     ImagePicker.showImagePicker(options, (response) => {
    //       console.log('Response = ', response);
    //       if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //       } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //       } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //         alert(response.customButton);
    //       } else {
    //         setFilePath(response);
    //       }
    // });

    launchCamera(options, (response) => {
      //launchImageLibrary(options, (response) => {
      //ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé");
      } else if (response.error) {
        console.log('Erreur : ', response.error);
      } else {
        console.log('Photo : ', response.uri);
        let requireSource = {uri: response.uri};
        //   this.setState({
        //     avatar: requireSource,
        //   });
        //setAvatar(requireSource);
      }
    });
  };

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => _avatarClicked()}>
      <Image style={styles.avatar} source={avatar} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2,
  },
});

// On mappe l'avatar aux props de notre component
const mapStateToProps = state => {
  return {
    avatar: state.setAvatarReducer.avatar,
  };
}

export default connect(mapStateToProps)(Avatar)


