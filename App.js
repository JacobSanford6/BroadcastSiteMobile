import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput, ScrollView, Dimensions, Pressable } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/Entypo'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {React, useState} from 'react';
import BroadcastScreen from './screens/BroadcastScreen';

const win = Dimensions.get('window')

const navigation = createNativeStackNavigator();

let pw = require("./password.json")

const Login = ({ navigation }) => {
  let [user, setUser] = useState("");
  let [pass, setPass] = useState("")

  // Checks if entered username and password match the one on file
  // If they match, go to the broadcast screen
  const loginRequest= () => {
    if (user = pw.user && pass == pw.pass){
      navigation.navigate('BroadcastScreen')
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'BroadcastScreen' }],
      });
    }
  }
  
  return(
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.fitIn} justifyContent='center' scrollEnabled={false}>
      <Text style={{alignSelf:'center', fontSize:35, color:"#F1828D", fontWeight:'bold'}}>Login</Text>
      <TextInput placeholder='Username/Email' placeholderTextColor="#FEFAD4"  secureTextEntry={true} style={styles.signInInput} id="user" onChangeText={newText=>setUser(newText)}></TextInput>
        <TextInput placeholder='Password' placeholderTextColor="#FEFAD4"  secureTextEntry={true} style={styles.signInInput} id="pass" onChangeText={newText=>setPass(newText)}></TextInput>
        <MaterialIcon name='login' style={styles.loginLabel} color={"#8FB9A8"} onPress={() => {loginRequest(); }}  ></MaterialIcon>
      </ScrollView>
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <navigation.Navigator screenOptions={{headerShown: false}}>
        <navigation.Screen name='login' component={Login}></navigation.Screen>
        <navigation.Screen name='BroadcastScreen' component={BroadcastScreen} ></navigation.Screen>
      </navigation.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FEFAD4',
      alignItems: 'center',
      justifyContent: 'center'
    },

    invisible: {
      opacity:0,
    },

    loginLabel: {
      fontSize: 50,
      width: 60,
      alignSelf: 'center',
      textAlign: 'center',
    },

    fitIn: {
      height: '100%',
      width: '100%',
      padding: 0,
      margin: 0,
    },

    playImage: {
      width:win.width*.75,
      height:win.width*.75,
      alignSelf:'center',
      justifySelf:'center',
    },
    
    signInInput:{
      borderWidth: 1,
      fontSize: 25,
      margin: 15,
      width: "75%",
      alignSelf: "center",
      borderWidth: 3,
      borderColor: "black",
      color: "#FEFAD4",
      paddingRight: 15,
      paddingLeft: 15,
      backgroundColor: "#8FB9A8"
    },

    styledText: {
      color: "#FFF",
    }
});
