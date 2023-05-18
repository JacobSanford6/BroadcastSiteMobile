//TODO: Consider adding a screen to view schedules

import { ScrollView, Platform, OpacityPressable, TextInput, StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Pressable, Alert } from "react-native";
import {React, useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

const navigation = createNativeStackNavigator();

const BroadcastScreen= ({ navigation }) =>{
    let [broadText, setBroadText] = useState("")
    let [broadImage, setImage] = useState(null);

    // Allows user to select an image from their image library
    // Returns object with selected images
    const pickImage = async () => {
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: 1,
        })
        .then(res=>{
            if (res.canceled){
                Alert.alert("No image selected")
            }else{
                setImage(res);
            }
        })
    }

    // Sends a post request to the server with a broadcast image
    const sendImageBroadcastAsync = async () =>{
        let url = "jacobsanford.ddns.net:5000"
        if (broadImage){
            const formData = new FormData();

            //create photo data to send to the server
            const photo = {
                uri: broadImage.assets[0].uri,
                name:  broadImage.assets[0].uri.substring(broadImage.assets[0].uri.length-4,3),
                type: "image/jpeg"
            };

            //generate a secret key
            const now = new Date()
            const timeNumber = parseInt ( (now.getHours()+now.getMinutes()).toString() + now.getMinutes().toString() ) 

            formData.append("secret-key", timeNumber)
            formData.append("broadcastImage", photo);

            //send the post request
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.send(formData);

            //check the results of the post request
            xhr.onload = () => {
                if (xhr.status == 200){
                    Alert.alert("Success", "Image sent successfully!")
                }
            }
        }
    }

    // Sends a post request with a broadcast message to the server
    const sendMessageBroadcastAsync= async () =>{
        // If the message isn't empty and it is less than 30 characters long...
        if (broadText.trim() != "" && broadText.trim().length <= 30){
            // Send the post request
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ broadcast: broadText })
            })
            .then(res=>{
                Alert.alert("Success","Message delivered successfully!")
            })
            .catch(err=>{
                console.log(err);
            })
        }else if (broadText.trim().length > 30){
            alert("Please keep broadcast below or equal to 30 characters");
            
        }else{
            alert("Please type something to send as a broadcast.");
        }

    }
    
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.fitIn} justifyContent="center" scrollEnabled={false}>
                
                <Text style={styles.styledText}>Enter Your Broadcast message here!</Text>
                <TextInput placeholder="Broadcast Message" placeholderTextColor="#FEFAD4" onChangeText={nt=>setBroadText(nt)} style={styles.signInInput}></TextInput>
                <Pressable onPress={sendMessageBroadcastAsync}>
                    <Text style={styles.button}>Send Broadcast</Text>
                </Pressable>
                
                {
                broadImage ? 
                
                <View>
                    <Text style={styles.imageText}>
                        { broadImage ? broadImage.assets[0].uri.split("/")[broadImage.assets[0].uri.split("/").length-1] : null }
                    </Text>
                    
                    <Pressable onPress={() => setImage(null)} style={styles.closeHolder}> 
                        <Ionicons name="close-circle-outline" color={"red"} size={20}></Ionicons>
                    </Pressable>
                    
                    
                </View>:null
                }
                
                <Pressable onPress={pickImage}>
                    <Text style={styles.button} >Upload Image</Text>
                </Pressable>
                
                <Pressable onPress={sendImageBroadcastAsync}>
                    <Text style={styles.button} >Send Image</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    )
}

const sWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    button: {
        fontSize: 25,
        backgroundColor: "#F1828D",
        width:sWidth*.75,
        alignSelf:"center",
        textAlign:"center",
        borderColor:"black",
        color:"#FEFAD4",
        borderWidth:3,
        margin: 10,
        padding: 2,
    },

    closeHolder:{
        alignSelf: "center"
    },

    container: {
        flex: 1,
        backgroundColor: "#FEFAD4",
        alignItems: "center",
        justifyContent: "center",
    },

    fitIn: {
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
    },

    imageText: {
        height: 20,
        textAlign: "center",
        flex:4
    },

    invisible: {
        opacity:0,
    },

    playImage: {
        width:sWidth*.75,
        height:sWidth*.75,
        alignSelf:"center",
        justifySelf:"center",

    },

    signInInput: {
        borderWidth: 3,
        fontSize: 25,
        margin: 15,
        width: "75%",
        alignSelf: "center",
        borderColor: "black",
        color: "#FEFAD4",
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: "#8FB9A8"

    },

    styledText: {
        color: "#F1828D",
        alignSelf: "center",
        fontSize: 20
    }
});

export default BroadcastScreen;