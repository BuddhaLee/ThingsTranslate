import React from 'react';
import styled from 'styled-components';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';

import {
  TouchableOpacity
} from 'react-native';

//import { Button, Text } from 'native-base';
//import { View , ScrollView} from 'react-native';
import * as ImageManipulator from "expo-image-manipulator";
import * as Localization from 'expo-localization';
//import { createStackNavigator } from 'react-navigation';
import ActionButton from 'react-native-action-button';

import { Camera } from 'expo-camera'; 
import * as Permissions from 'expo-permissions';
import colours from './Colours';
import axios from 'axios';
import Loader from './Loader';
import config from './config';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,

} from 'react-native';
// import { 
//   Ionicons,
//   MaterialIcons,
//   Foundation,
//   MaterialCommunityIcons,
//   Octicons
// } from '@expo/vector-icons';




class CameraScreen extends React.Component {

 constructor() {
   super();
   this.snap = this.snap.bind(this);
   this.state = {
    flash: 'off',
     hasCameraPermission: null,
     loading: false
   };
 }
 
 async componentDidMount() {
   const { status } = await Permissions.askAsync(Permissions.CAMERA);
   this.setState({ hasCameraPermission: status === 'granted' });
 }

 snap = async () => {
   this.setState({ loading: true });
   //const { navigate } = this.props.navigation;
   if (this.camera) {
     let photo;
     let textRecieved;
     let translatedText;
     try {
       let { uri } = await this.camera.takePictureAsync();

       photo = await ImageManipulator.manipulateAsync(
         uri,
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
     this.props.navigation.navigate('rootText',{ text: translatedText, Etext:textRecieved})

   }
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

 toggleFlash = () => this.setState({ flash: flashModeOrder[this.state.flash] });

 render() {
   const { hasCameraPermission } = this.state;
   if (hasCameraPermission === null) {
     return <View />;
   } else if (hasCameraPermission === false) {
     return <Text>No access to camera</Text>;
   } else {
    const { navigate } = this.props.navigation;

     return (
       <View style={{ flex: 1 }}>
         <Loader loading={this.state.loading} />
         <Camera
          flashMode={this.state.flash}
           autoFocus={Camera.Constants.AutoFocus.on}
           style={{
             flex: 1,
             flexDirection: 'row',
             alignItems: 'flex-end',
             justifyContent: 'center'
           }}
           type={this.state.type}
           ref={ref => {
             this.camera = ref;
           }}>
           {/* <View style={{ margin: 20, padding: 20 }}> */}
             {/* <Button bordered onPress={this.snap} light>
               <Text>Shot</Text>
             </Button> */}
           
        
    <View
      style={styles.topBar}>
      <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.snap}>
        <Icon style={styles.actionButtonitemIcon} name="md-camera" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash} >
        <Icon name="md-flash" size={32} color="white" />
      </TouchableOpacity>

    </View>



           {/* </View> */}
         </Camera>
       </View>

       
     );
   }
 }
}

export default CameraScreen;

// const Button= styled.TouchableOpacity`
// width:100%;
// padding:20px;
// `;

// const Text = styled.Text`
//  color: ${colours.blue};
//  font-size: 50px;
//  margin-top: 5%;
//  margin-left: 20px;
//  font-weight: bold;
// `
const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const TouchButton= styled.TouchableOpacity`
width:50%;
padding:10px;
`;

const styles = StyleSheet.create({
  actionButtonitemIcon: {
    fontSize: 44,
    height: 55,
    color: 'white',
  },
  actionButtonIcon:{
    fontSize: 33,
    height: 29,
    color: 'white',
  },
  toggleButton: {
    flex: 0.01,
    height: 40,
    marginHorizontal: 3,
    marginBottom: 10,
    marginTop: 20,
    padding: 22,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },


});