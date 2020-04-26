import React from 'react';
import { ScrollView ,Picker, Button} from 'react-native';
import {View, TextInput, Text} from 'react-native-ui-lib';

import styled from 'styled-components';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  StyleSheet,

} from 'react-native';
import ActionButton from 'react-native-action-button';
import * as Speech from 'expo-speech';

import Icon from 'react-native-vector-icons/Ionicons';

export default class rootText extends React.Component {

    render() {
        //let { navigate } = props.navigation;
      targettext=this.props.route.params.text;
      Englishtext=this.props.route.params.Etext;
        
        return (
            <View style={{ flex: 1, marginTop: 30 }}>

  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View stlye={{ flex: 2 }}>
                  <Text style={{ fontSize: 20 }}>{targettext}</Text>
                  <Text style={{ fontSize: 20 }}>{Englishtext}</Text>
              
                </View>
 
              </View>
              <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
    <ActionButton renderIcon={(active) => (active? (<Icon name="md-search" style={styles.actionButtonIcon} /> ): ( <Icon name="md-search" style={styles.actionButtonIcon} />))} hideShadow={true} size={97} buttonColor="rgba(231,76,60,1)">
    <ActionButton.Item size={60} buttonColor='#1abc9c' title="pronunciation" onPress={()=>Speech.speak(Englishtext)} >
        <Icon name="md-microphone" style={styles.actionButtonitemIcon} />
      </ActionButton.Item>
      <ActionButton.Item size={60} buttonColor='#3498db' title="Album" onPress={() => this.props.navigation.navigate('LibraryScreen', {name: 'LibraryScreen'})}>
        <Icon name="md-photos" style={styles.actionButtonitemIcon} />
      </ActionButton.Item>
      <ActionButton.Item size={60} buttonColor='#1abc9c' title="Camera" onPress={() => this.props.navigation.navigate('Camera', {name: 'things'})}>
        <Icon name="md-camera" style={styles.actionButtonitemIcon} />
      </ActionButton.Item>

    </ActionButton>
  </View>
            {/* <ScrollView style={{ flex: 1, margin:111  }}>


            </ScrollView> */}

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