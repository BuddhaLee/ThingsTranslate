
import * as React from 'react';

import {View} from 'react-native-ui-lib';

import {
  StyleSheet,
  Alert

} from 'react-native';


import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from "@paraboly/react-native-card";
import { SimpleCard } from "@paraboly/react-native-card";

export default class HomeScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        country:"",
        name:"Please Choose target languages",
        languagechoosen: false,
 
    }
  }
  
  setcountry = (country,name) => {
    this.setState({ country: country});
    this.setState({ name: name});

    console.log(this.state.country);
    this.setState({languagechoosen:true});
    console.log(this.state.languagechoosen);

  };

  checklanguage=(screen)=>{
    if(!this.state.languagechoosen){
        Alert.alert('please choose language')
    }
    else{
        console.log(screen);
        this.props.navigation.navigate(screen, {country:this.state.country})
    }
  };

    render(){
    return (
    <View style={{flex:1, backgroundColor: '#c7d2d8'}}>
    <View style={{
              marginTop: 16,
              alignItems: "center",
              flexDirection: "column",
            }}>
    <View> 
     
          <Card
            title="French"
            iconName="language"
            defaultTitle=""
            iconType="Entypo"
            onPress={()=>{this.setcountry("fr","French")}}
            content="
            Cliquez pour passer à la traduction française"
          />
            </View>

           <View style={{ marginTop: 16 }}> 
           <Card
          title="Spain"
          iconName="language"
          defaultTitle=""
          iconType="Entypo"
          defaultContent=""
          onPress={()=>{this.setcountry("es","Spain")}}
          content="Traducir al español"
          />
          </View>

          <View style={{ marginTop: 16 }}>  
          <Card
          title="Chinese"
          iconName="language"
          defaultTitle=""
          iconType="Entypo"
          defaultContent=""
          onPress={()=>{this.setcountry("zh","Chinese")}}
          content="点击切换成中文翻译"
          />

                  </View>
                  <View style={{ marginTop: 16 }}>  
                  <Card
         // style={styles.container}
          title="Japanese"
          iconName="language"
          defaultTitle=""
          iconType="Entypo"
          defaultContent=""
          onPress={()=>{this.setcountry("ja","Japanese")}}

          content="
          日本語翻訳に切り替え"
          />
          
                  </View>
                  <View style={{ marginTop: 9 }}>  
                  <SimpleCard
  title={"language:"+ this.state.name}
  styles={{ height: 1}}
/>
                  </View>

        
  
        </View>

        <View style={{flex:1,elevation: 10}}>
        <ActionButton  renderIcon={(active) => (active? (<Icon name="md-search" style={styles.actionButtonIcon} /> ): ( <Icon name="md-search" style={styles.actionButtonIcon} />))} hideShadow={true} size={97} buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item style={{flex:1,elevation: 10}} size={60} buttonColor='#3498db' title="OCR" onPress={() => this.checklanguage("OCRScreen")}>
        <Icon name="md-text" style={styles.actionButtonitemIcon} />
        </ActionButton.Item>
        <ActionButton.Item size={60} buttonColor='#3498db' title="Album" onPress={() => this.checklanguage("Album")}>
        <Icon name="md-photos" style={styles.actionButtonitemIcon} />
        </ActionButton.Item>
        {/* <ActionButton.Item size={60} buttonColor='#1abc9c' title="Camera" onPress={() => this.props.navigation.navigate('Camera', {country:this.state.country})}> */}
        <ActionButton.Item size={60} buttonColor='#1abc9c' title="Camera" onPress={() => this.checklanguage("Camera")}>

        <Icon name="md-camera" style={styles.actionButtonitemIcon} />
        </ActionButton.Item>
    </ActionButton>

    </View>
    </View>
    
      
    );
          }    
    
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 0,
      alignItems: "center",
      margin:0,
  
      //backgroundColor: "#fff",
      justifyContent: "center"
    },
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
    card:{
      marginTop:  50,
      },
  
  });
