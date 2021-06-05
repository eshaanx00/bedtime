import React, { Component } from 'react'
import {Text, View, StyleSheet,TouchableOpacity,FlatList} from 'react-native';
import Header from '../assets/headerForSearch'
import { SearchBar } from 'react-native-elements';
import db from '../config'
import firebase from 'firebase';
import { TextInput } from 'react-native';

export default class ReadStoryScreen extends Component {
    constructor(){
    super();
    this.state={
    search:null,
    allStory:[],
    lastVisibleStory:null,
    }
    }
    componentDidMount=async()=>{
    
        const query = await db.collection("Story").limit(10).get()
    query.docs.map((doc)=>{
    this.setState({
        allStory:[],
        lastVisibleStory:doc,
    })
    })
    this.retriveAllStories()
    }

    searchStory=async(text)=>{
        const search = this.state.search

        const story = await db.collection("Story").where('title','==',text).get();
        story.docs.map((doc)=>{
            this.setState({
                allStory:[...this.state.allStory,doc.data()],
                lastVisibleStory:doc
            })
        })
    
}

    fetchStory=async()=>{
    const search=this.state.search;

        var text = this.state.search
        const story = await db.collection("Story").where('title','==',text).startAfter(this.state.lastVisibleStory).limit(10).get();
        story.docs.map((doc)=>{
            this.setState({
                allStory:[...this.state.allStory,doc.data()],
                lastVisibleStory:doc
            })
        })
    
}


retriveAllStories=async()=>{
    const story = await db.collection("Story").where('title','!=',false).get();
    story.docs.map((doc)=>{
        this.setState({
            allStory:[...this.state.allStory,doc.data()],
            lastVisibleStory:doc
        })
    })
} 

    render() {
        return (
            <View style={styles.container}>

            <TextInput
        placeholder="Type Here..."
        onChangeText={(text)=>{this.setState({search:text})}}
        style={styles.textInputStyle}
        textAlign={'center'}
        />
        


        <TouchableOpacity style={styles.touchstyle} onPress={()=>{
            this.searchStory(this.state.search)
        }}><Text>Search</Text></TouchableOpacity>


        <FlatList data={this.state.allStory} renderItem={({item})=>( <View style={styles.listStyle}>
            <Text>{"Title : "+item.title}</Text>
            <Text>{"Author : "+item.author}</Text>
            </View>)
        
        }
        keyExtractor={(index)=>index.toString()}
        onEndReached={this.fetchStory}
        onEndReachedThreshold={0.6}
        ></FlatList>


            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
    backgroundColor: 'pink',
    },touchstyle:{
        height:30,
    width:50,
    alignItems:'center',
    justifyContent:"center",
    backgroundColor:"lightyellow",
    alignSelf:'center',
    marginTop:10,
    borderRadius:7
    },listStyle:{
        backgroundColor:'white',
        width:400,
        marginTop:5,
        height:40,
        borderWidth:1,
        fontSize:33,
        borderRadius:2,
        marginLeft:5
    },textInputStyle:{
        width:290,
    height:30,
    borderWidth:1.5,
    fontSize:20,
    alignSelf:'center',
    justifyContent:'center',
    borderRadius:7,
    paddingLeft:5
    },
});
