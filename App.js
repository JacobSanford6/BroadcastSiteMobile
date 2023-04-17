import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput, ScrollView, Dimensions, Pressable } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/Entypo'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {React, useState} from 'react';
import BroadcastScreen from './screens/BroadcastScreen';
import SpreadSheetScreen from './screens/SpreadSheetScreen'

console.log(BroadcastScreen)

const win = Dimensions.get('window')

const navigation = createNativeStackNavigator();

  let pw = require("./password.json")

const Login = ({ navigation }) => {
  let [user, setUser] = useState("");
  let [pass, setPass] = useState("")

  const loginRequest= () => {
    console.log("attempted with username: " + user + " and password " + pass)
    if (user = pw.user && pass == pw.pass){
      console.log("success");
      

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
      <TextInput placeholder='Username/Email' placeholderTextColor="#ff8c00b4"  secureTextEntry={true} style={styles.signInInput} id="user" onChangeText={newText=>setUser(newText)}></TextInput>
        <TextInput placeholder='Password' placeholderTextColor="#ff8c00b4"  secureTextEntry={true} style={styles.signInInput} id="pass" onChangeText={newText=>setPass(newText)}></TextInput>
        <MaterialIcon name='login' style={styles.loginLabel} color={"green"} onPress={() => {loginRequest(); }}  ></MaterialIcon>
      </ScrollView>

      </SafeAreaView>
  )
}

export default function App() {
  
  

  
  return (
    
    <NavigationContainer>
      
      <navigation.Navigator screenOptions={{
    headerShown: false
  }}>
        <navigation.Screen name='login' component={Login}>
        </navigation.Screen>

        <navigation.Screen name='BroadcastScreen' component={BroadcastScreen} ></navigation.Screen>
        <navigation.Screen name='SpreadSheetScreen' component={SpreadSheetScreen}></navigation.Screen>
      </navigation.Navigator>
    </NavigationContainer>
    
  )
}


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

  loginLabel: {
    fontSize: 50,
    width: 60,
    alignSelf: 'center',
    textAlign: 'center',
    
  },

  playImage: {
    width:win.width*.75,
    height:win.width*.75,
    alignSelf:'center',
    justifySelf:'center',

  },

  styledText: {
    color: "#FFF",
    
  }
});
