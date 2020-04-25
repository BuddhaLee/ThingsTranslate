import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Button
} from 'react-native';

import CameraScreen from './Camera';
import rootText from './Text';

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
    />
  );
}



function Profile({navigation}) {
  return (
    <Button
      title="Go to Home"
      onPress={() => navigation.navigate('Camera', {name: 'Camera'})}
    />
  );
}



export default function App() {
  return (
 <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="rootText" component={rootText} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}