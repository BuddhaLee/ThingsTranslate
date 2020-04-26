
//import {View, TextInput, Text, Button} from 'react-native-ui-lib';


import * as ImageManipulator from "expo-image-manipulator";
import * as Localization from 'expo-localization';

//import * as Permissions from 'expo-permissions';
import axios from 'axios';
import config from './config';

import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export default class LibraryScreen extends React.Component {
    state = {
        image: null,
      };
   
getText = image => {
    return axios
      .post(config.googleCloudVision.api + config.apiKey, {
        requests: [
          {
            image: {
              content: image
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                //type: 'TEXT_DETECTION',
 
                maxResults: 1
              }
            ]
          }
        ]
      })
      .then(response => response.data)
      .then(label => label.responses[0].labelAnnotations[0].description)
      //.then(text => text.responses[0].fullTextAnnotation)
 
      .catch(err => console.log(err));
  };
 
 
  getTranslatedText = async parsedText => {
    //let lang = await Expo.DangerZone.Localization.getCurrentLocaleAsync();
    let lang = await Localization.locale;
 
    let toLang = lang.slice(0, 2);
    let text = parsedText;
    const API_KEY = config.apiKey;
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&target=${toLang}`;
    
 
    return axios
      .post(url)
      .then(res => res.data)
      .then(response => response.data.translations[0].translatedText)
      .catch(error => {
        console.log('There was an error with the translation request: ', error);
      });
  };
  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1
    });


    if (!result.cancelled) {
        let photo;
        let textRecieved;
        let translatedText;
        try {
        //console.log(result.uri);

        //   let { uri } = await this.setState(result.uri);

          photo = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { width: 420 } }],
            {
              base64: true
            }
          );
          textRecieved = await this.getText(photo.base64);
          console.log(textRecieved);
           translatedText = await this.getTranslatedText(textRecieved);
          if (translatedText === 'undefined') {
            translatedText = 'Text not recognized';
          }
          this.setState({ loading: false });
        } catch (err) {
          this.setState({ loading: false });
          console.log(err);
        }
   
        //navigate('rootText', { text: translatedText });
        //this.rootText( translatedText );
        console.log(translatedText);
        this.props.navigation.navigate('rootText',{ text: translatedText,})
    }
  };

}
