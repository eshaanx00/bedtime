import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import WriteStoryScreen from './screens/WriteStoryScreen'
import ReadStoryScreen from './screens/ReadStoryScreen'
import Header from './assets/header'

export default class App extends React.Component{
render(){
  return(
    <View style={styles.container}>
      <View><Header/></View>
      <AppContainer/>
    </View>
  )
}
}
const TabNavigator = createBottomTabNavigator({
  WriteStory: {screen : WriteStoryScreen},
  ReadStory : {screen:ReadStoryScreen}
},{defaultNavigationOptions:({navigation})=>({
  tabBarIcon:()=>{
    const routeName = navigation.state.routeName
    if(routeName==='WriteStory'){
      return(<Image style={styles.imageStyle} source={require('./assets/write.png')}></Image>)
    }else if(routeName==='ReadStory'){
      return(<Image style={styles.imageStyle} source={require('./assets/read.png')}></Image>)
    }
  }
})}
)
const AppContainer = createAppContainer(TabNavigator);
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }, imageStyle:{
    width:40,
    height:40,
  }
});