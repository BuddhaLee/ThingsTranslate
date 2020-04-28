import React from 'react';
import {View, Text} from 'react-native-ui-lib';


import {
  StyleSheet,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import * as Speech from 'expo-speech';

import Icon from 'react-native-vector-icons/Ionicons';



export default class rootText extends React.Component {



    render() {

        Englishtext=this.props.route.params.text;
      TargetText=this.props.route.params.Etext;
      country=this.props.route.params.country;
   
        return (
            <View style={{ flex: 1, marginTop: 32}}>

  <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <View stlye={{ flex: 1 }}>
                  <Text style={{ fontSize: 20 }}>{"English: "+Englishtext}</Text>
                  </View>
                  <View style={{  marginTop: 12 }}>

                  <Text style={{ fontSize: 20 }}>{"Target language: "+TargetText}</Text>
              
                  </View>

 
              </View>
              <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
    <ActionButton renderIcon={(active) => (active? (<Icon name="md-search" style={styles.actionButtonIcon} /> ): ( <Icon name="md-search" style={styles.actionButtonIcon} />))} hideShadow={true} size={97} buttonColor="rgba(231,76,60,1)">
    <ActionButton.Item size={60} buttonColor='#1abc9c' title="pronunciation" onPress={()=>Speech.speak(Englishtext)} >
        <Icon name="md-microphone" style={styles.actionButtonitemIcon} />
      </ActionButton.Item>
      <ActionButton.Item size={60} buttonColor='#3498db' title="OCR" onPress={() => this.props.navigation.navigate('OCRScreen', {name: 'OCRScreen'})}>
        <Icon name="md-text" style={styles.actionButtonitemIcon} />
      </ActionButton.Item>
      <ActionButton.Item size={60} buttonColor='#3498db' title="Album" onPress={() => this.props.navigation.navigate('Album', {name: 'Album'})}>
        <Icon name="md-photos" style={styles.actionButtonitemIcon} />
      </ActionButton.Item>
      <ActionButton.Item size={60} buttonColor='#1abc9c' title="Camera" onPress={() => this.props.navigation.navigate('Camera', {name: 'things'})}>
        <Icon name="md-camera" style={styles.actionButtonitemIcon} />
      </ActionButton.Item>

    </ActionButton>
  </View>
            

          </View>
        );
    }           

}



const styles = StyleSheet.create({
  actionButtonitemIcon: {
    fontSize: 22,
    height: 22,
    color: 'white',
  },
  actionButtonIcon:{
    fontSize: 33,
    height: 29,
    color: 'white',
  },

});