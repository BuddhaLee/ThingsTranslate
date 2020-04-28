import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import HomeScreen from './HoemScreen';
import LibraryScreen from './LibraryDetect';
import CameraScreen from './Camera';
import rootText from './Text';
import OCRScreen from './Document';

const Stack = createStackNavigator();





export default function App() {
  return (
 <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Text" component={rootText} />
        <Stack.Screen name="Album" component={LibraryScreen} />
        <Stack.Screen name="OCRScreen" component={OCRScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}