import React from 'react';
import {Text,StyleSheet,View} from 'react-native';

export default class Header extends React.Component{
    render(){
        return(
            <View>
            <Text>Bed Time Stories</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
textStyle:{
    alignSelf:'center',
    
}
})