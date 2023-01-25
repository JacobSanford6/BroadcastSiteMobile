import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput, ScrollView, Dimensions, Pressable } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/Entypo'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {React} from 'react';

const win = Dimensions.get('window')

const navigation = createNativeStackNavigator();

const PlayScreen = ({ navigation }) => {
  const playPress = () =>{
    console.log("Starting Chain Reaction")
    
  }

  return(

    <SafeAreaView style={styles.container}>
      <View style={styles.fitIn} justifyContent='center' scrollEnabled={false}>
        <Pressable  onPress={playPress} >
          <Image style={styles.playImage}source={require('./components/images/green-play-button-png.png')}></Image>
        </Pressable>
        
      </View>
      
    </SafeAreaView>

  )
}

let [user, pass] = ["", ""];
  let pw = require("./password.json")

const Login = ({ navigation }) => {
  const loginRequest= (user, pass) => {
    if (user = pw.user && pass == pw.pass){
      console.log("succes");
      

      navigation.navigate('PlayScreen')
      
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'PlayScreen' }],
      });
    }
  }
  
  return(
    <SafeAreaView style={styles.container}>
      
      <ScrollView style={styles.fitIn} justifyContent='center' scrollEnabled={false}>
        <TextInput placeholder='Username/Email' placeholderTextColor="#ff8c00b4"  secureTextEntry={true} style={styles.signInInput} id="user" onChangeText={newText=>user=newText}></TextInput>
        <TextInput placeholder='Password' placeholderTextColor="#ff8c00b4"  secureTextEntry={true} style={styles.signInInput} id="pass" onChangeText={newText=>pass=newText}></TextInput>
        <MaterialIcon name='login' style={styles.loginLabel} color={"green"} onPress={() => {loginRequest(user,pass); }}  ></MaterialIcon>
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

        <navigation.Screen name='PlayScreen' component={PlayScreen} ></navigation.Screen>
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

  }

});
