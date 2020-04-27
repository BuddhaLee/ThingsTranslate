import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';

import {
  StyleSheet,

} from 'react-native';
import LibraryScreen from './LibraryDetect';
import CameraScreen from './Camera';
import rootText from './Text';
import OCRScreen from './Document';

//import ActionButton from 'react-native-circular-action-menu';
import ActionButton from 'react-native-action-button';

import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
    {/*Rest of App come ABOVE the action button component!*/}
    <ActionButton renderIcon={(active) => (active? (<Icon name="md-search" style={styles.actionButtonIcon} /> ): ( <Icon name="md-search" style={styles.actionButtonIcon} />))} hideShadow={true} size={97} buttonColor="rgba(231,76,60,1)">
    <ActionButton.Item size={60} buttonColor='#3498db' title="OCR" onPress={() => navigation.navigate('OCRScreen', {name: 'OCRScreen'})}>
        <Icon name="md-text" style={styles.actionButtonitemIcon} />
      </ActionButton.Item>
      <ActionButton.Item size={60} buttonColor='#3498db' title="Text detection" onPress={() => navigation.navigate('LibraryScreen', {name: 'LibraryScreen'})}>
        <Icon name="md-photos" style={styles.actionButtonitemIcon} />
      </ActionButton.Item>
      <ActionButton.Item size={60} buttonColor='#1abc9c' title="Thing translator" onPress={() => navigation.navigate('Camera', {name: 'things'})}>
        <Icon name="md-camera" style={styles.actionButtonitemIcon} />
      </ActionButton.Item>
    </ActionButton>
  </View>
    // <Button
   
    //   round
    //   backgroundColor="#000000"
    //   label="choose"
    //   size="medium"
    //   text80
    // labelStyle={{"fontWeight":"700","letterSpacing":4}}
    // style={{
    //   "boderWidth":5,
    //   "marginBottom":39
    // }}
    //   onPress={() => navigation.navigate('Camera', {name: 'Jane'})}
    // />
    
  );
  
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




export default function App() {
  return (
 <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="rootText" component={rootText} />
        <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
        <Stack.Screen name="OCRScreen" component={OCRScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}