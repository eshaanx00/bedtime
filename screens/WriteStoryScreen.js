import React, { Component } from 'react'
import {TextInput, View, Text ,TouchableOpacity, StyleSheet,KeyboardAvoidingView, ToastAndroid} from 'react-native';
import db from '../config'
import firebase from 'firebase';

export default class WriteStoryScreen extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            author:'',
            story:''
        }
    }
    uploadStory=()=>{
    db.collection("Story").doc(this.state.title).set({
        title:this.state.title,
        author:this.state.author,
        story:this.state.story
    })
    
    this.showToast("Your story has been submitted")
    }
    showToast=(message)=>{
    ToastAndroid.show(message,ToastAndroid.LONG);
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={{marginTop:-100}}>
                <TextInput style={styles.inputStyle} onChangeText={(value)=>{this.setState({title:value})}} placeholder="Story Title"></TextInput>
                <TextInput style={styles.inputStyle} onChangeText={(value)=>{this.setState({author:value})}} placeholder="Author"></TextInput>
                <TextInput multiline={true} onChangeText={(value)=>{this.setState({story:value})}} style={styles.bigInputStyle} placeholder="Write your story"></TextInput>
                <TouchableOpacity style={styles.opacityStyle} onPress={()=>{
                    this.uploadStory()
                }}><Text style={{alignSelf:'center',marginTop:5,marginLeft:2}}>Submit</Text></TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    inputStyle:{
        marginTop:25,
        borderWidth:1,
        width:300,
        textAlign:'center',
        alignSelf:'center',
        borderRadius:10
    },
    bigInputStyle:{
        marginTop:25,
        borderWidth:1,
        width:300,
        height:100,
        textAlign:'center',
        alignSelf:'center',
        borderRadius:10
    },
    opacityStyle:{
        width:100,
        height:30,
        marginTop:50,
        backgroundColor:'pink',
        textAlignVertical:'center',
        borderRadius:5,
        alignSelf:'center'
    }, container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
    
    }
})
