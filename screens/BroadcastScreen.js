import { ScrollView, OpacityPressable, TextInput, StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Pressable, useWindowDimensions } from 'react-native';
import {React, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

let count = 0; 

const navigation = createNativeStackNavigator();

const BroadcastScreen= ({ navigation }) =>{
    let broadText = "";


   const playPress = () =>{
        console.log("Starting Chain Reaction")
        
    }

    const broadcastPress= async () =>{
        count += 1;
        if (broadText.trim() != "" && broadText.trim().length <= 30){
            console.log("Sending message: " + broadText + " count: " + count);

            /*
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ broadcast: "Jake" })
            };

            const response = await fetch("http://127.0.0.1:5000/", requestOptions);
            console.log(await response.json())
            */


            const response = await fetch("https://reqres.in/api/posts", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ broadcast: "Jake" })
            })
            const json = await response.json();
            console.log(json)
        }else if (broadText.trim().length > 30){
            alert("Please keep broadcast below or equal to 30 characters");
            
        }else{
            alert("Please type something to send as a broadcast.");
        }

    }
    
    return(
        

        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.fitIn} justifyContent='center' scrollEnabled={false}>
            
            <Text style={styles.styledText}>Enter Your Broadcast message here!</Text>
            <TextInput placeholder='Broadcast Message' placeholderTextColor="#ff8c00b4" onChangeText={nt=>broadText=nt} style={styles.signInInput}></TextInput>
            <Pressable onPress={broadcastPress}>
                <Text style={styles.button}>Send Broadcast</Text>
            </Pressable>


            <Pressable  onPress={playPress} >
                <Image style={styles.playImage}source={require('../components/images/green-play-button-png.png')}></Image>
            </Pressable>
            
        </ScrollView>
        
        </SafeAreaView>


    )
}

const sWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    

    container: {
        flex: 1,
        backgroundColor: '#444444',
        alignItems: 'center',
        justifyContent: 'center'
    },

    fitIn: {
        height: '100%',
        width: '100%',
        padding: 0,
        margin: 0,
        
    },

    invisible: {
        opacity:0,
    },

    signInInput: {
        borderWidth: 1,
        fontSize: 25,
        margin: 15,
        width: "75%",
        alignSelf: 'center',
        borderColor: "white",
        color: "darkorange",
        paddingRight: 15,
        paddingLeft: 15,

    },

    playImage: {
        width:sWidth*.75,
        height:sWidth*.75,
        alignSelf:'center',
        justifySelf:'center',

    },

    styledText: {
        color: "#FFF",
        alignSelf: 'center',
    },

    button: {
        fontSize: 25,
        backgroundColor: '#FFFFFF33',
        width:sWidth*.75,
        alignSelf:'center',
        textAlign:'center',
        borderColor:"white",
        color:'darkorange',
        borderWidth:1,
    }
});



export default BroadcastScreen;