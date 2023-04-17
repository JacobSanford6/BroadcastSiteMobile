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

    const moveToSpreadsheetScreen = () =>{
        navigation.navigate("SpreadSheetScreen")
    }

    const sendImageBroadcastAsync = async () =>{
        if (broadImage){

            const formData = new FormData();

            const photo = {
                uri: broadImage.assets[0].uri,
                name:  broadImage.assets[0].uri.substring(broadImage.assets[0].uri.length-4,3),
                type: "image/jpeg"
            };

            const now = new Date()
            const timeNumber = parseInt ( (now.getHours()+now.getMinutes()).toString() + now.getMinutes().toString() ) 

            formData.append("secret-key", timeNumber)
            formData.append("broadcastImage", photo);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://167.248.46.73:5000");
            xhr.send(formData);

            if (xhr.status == 200){
                console.log("recieved")
            }else{
                console.warn("error")
            }
        }
    }

    const sendMessageBroadcastAsync= async () =>{
        if (broadText.trim() != "" && broadText.trim().length <= 30){

            await fetch("http://167.248.46.73:5000", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
        <ScrollView style={styles.fitIn} justifyContent="center" scrollEnabled={false}>
            
            <Text style={styles.styledText}>Enter Your Broadcast message here!</Text>
            <TextInput placeholder="Broadcast Message" placeholderTextColor="#ff8c00b4" onChangeText={nt=>setBroadText(nt)} style={styles.signInInput}></TextInput>
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

            <Pressable onPress={moveToSpreadsheetScreen}>
                <Text style={styles.button} >Open Schedule</Text>
            </Pressable>

        </ScrollView>
        </SafeAreaView>
    )
}

const sWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#444444",
        alignItems: "center",
        justifyContent: "center"
    },

    fitIn: {
        height: "100%",
        width: "100%",
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
        alignSelf: "center",
        borderColor: "white",
        color: "darkorange",
        paddingRight: 15,
        paddingLeft: 15,

    },

    playImage: {
        width:sWidth*.75,
        height:sWidth*.75,
        alignSelf:"center",
        justifySelf:"center",

    },

    styledText: {
        color: "#FFF",
        alignSelf: "center",
    },

    button: {
        fontSize: 25,
        backgroundColor: "#FFFFFF33",
        width:sWidth*.75,
        alignSelf:"center",
        textAlign:"center",
        borderColor:"white",
        color:"darkorange",
        borderWidth:1,
        margin: 10,
        padding: 2,
    },

    imageText: {
        height: 20,
        
        textAlign: "center",
        flex:4
    },

    
    closeHolder:{
        alignSelf: "center"
    }
});

export default BroadcastScreen;