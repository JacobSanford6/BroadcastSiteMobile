//TODO: Give user input on whether or not their broadcast was sent
//TODO: Remove play button and/or create a spreadsheet parser

import { ScrollView, OpacityPressable, TextInput, StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Pressable, Alert } from 'react-native';
import {React, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

let count = 0; 

const navigation = createNativeStackNavigator();

const BroadcastScreen= ({ navigation }) =>{
    let [broadText, setBroadText] = useState("")

    const broadcastPress= async () =>{
        count += 1;
        if (broadText.trim() != "" && broadText.trim().length <= 30){
            console.log("Sending message: " + broadText + " count: " + count);

            const response = await fetch("http://167.248.46.73:5000", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ broadcast: broadText })
            })
            .then(res=>{
                Alert.alert("Success","Message delivered successfully!")
            })
            .catch(err=>{
                console.error(err);
            })
            
            
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
            <TextInput placeholder='Broadcast Message' placeholderTextColor="#ff8c00b4" onChangeText={nt=>setBroadText(nt)} style={styles.signInInput}></TextInput>
            <Pressable onPress={broadcastPress}>
                <Text style={styles.button}>Send Broadcast</Text>
            </Pressable>

            <Pressable>
                <Text style={styles.button}>Upload Image</Text>
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
        margin: 10,
        padding: 2,
    }
});



export default BroadcastScreen;