import React from 'react';
import styled from 'styled-components';
import {View, Text} from 'react-native-ui-lib';

import {
  TouchableOpacity
} from 'react-native';

import * as ImageManipulator from "expo-image-manipulator";

import { Camera } from 'expo-camera'; 
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Loader from './Loader';
import config from './config';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,

} from 'react-native';





class CameraScreen extends React.Component {

 constructor() {
   super();
   this.snap = this.snap.bind(this);
   this.state = {
    flash: 'off',
     hasCameraPermission: null,
     loading: false,
   };
 }
 
 async componentDidMount() {
   const { status } = await Permissions.askAsync(Permissions.CAMERA);
   this.setState({ hasCameraPermission: status === 'granted' });
 }

 snap = async () => {
   this.setState({ loading: true });
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
       country=this.props.route.params.country;
        translatedText = await this.getTranslatedText(textRecieved);
       if (translatedText === 'undefined') {
         translatedText = 'Text not recognized';
       }
       this.setState({ loading: false });
     } catch (err) {
       this.setState({ loading: false });
       console.log(err);
     }


     console.log(translatedText);
  
     this.props.navigation.navigate('Text',{ text: textRecieved, Etext:translatedText});


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

               maxResults: 1
             }
           ]
         }
       ]
     })
     .then(response => response.data)
     .then(label => label.responses[0].labelAnnotations[0].description)

     .catch(err => console.log(err));
 };


 getTranslatedText = async parsedText => {
   let lang = country;

   
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
        
           
        
    <View
      style={styles.topBar}>
      <TouchableOpacity  onPress={this.snap}>
        <Icon style={styles.actionButtonIcon}  name="md-camera"  color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={this.toggleFlash} >
        <Icon name="md-flash" style={styles.toggleButton}  size={32} color="white" />
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


const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};



const styles = StyleSheet.create({
  actionButtonitemIcon: {
    fontSize: 44,
    height: 55,
    color: 'white',
  },
  topBar: {

    flexDirection: 'row',
    

  },
  toggleButton: {
    fontSize: 35,
    marginLeft:30 ,
    height: 95,
    color: 'white',
  },

  actionButtonIcon:{
    fontSize: 55,
    height: 95,
    color: 'white',
    paddingLeft:47,

  },

  autoFocusLabel: {
    fontSize: 20,
    fontWeight: 'bold'
  },



});