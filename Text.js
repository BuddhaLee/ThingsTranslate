import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styled from 'styled-components';

export default class rootText extends React.Component {


    render() {
       // const {navigation} = this.props;
        console.log(this.props);

        //console.log(this.props.route.params.text);
        targettext=this.props.route.params.text;
        return (
            <View style={{ flex: 1, marginTop: 20 }}>
              <Button
                block
                primary
                onPress={() => {
                  navigate('Home');
                }}
              >
                <Text style={{ color: 'white' }}> Back to Camera </Text>
              </Button>
            <ScrollView style={{ flex: 1, margin: 20 }}>
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View stlye={{ flex: 1 }}>
                  <Text style={{ fontSize: 20 }}>{targettext}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        );
    }           

}


const Button= styled.TouchableOpacity`
width:100%;
padding:20px;
`;