import { ScrollView, Platform, OpacityPressable, TextInput, StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Pressable, Alert } from "react-native";
import {React, useEffect, useState, useLayoutEffect} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ElementDropDown from "react-native-element-dropdown";
import { validate } from "react-native-web/dist/cjs/exports/StyleSheet/validate";
import { inline } from "react-native-web/dist/cjs/exports/StyleSheet/compiler";




const navigation = createNativeStackNavigator();

const SpreadSheetScreen= ({ navigation }) =>{
    const [isFocus, setIsFocus] = useState(false);
    const [dropValue, setDropValue] = useState(null);
    let [data, setData] = useState([]);

    const [jsonData, setJson] = useState(null)

    useLayoutEffect(function(){
        obtainFileAsync();
    },[0]);

    const compareTimes = (col) =>{
        let colVals = []
        let closers = []
        for (let eName of jsonData){
            if (jsonData[eName][col].contains("CL")){
                closers.push(jsonData[eName][col])
            }
            colVals.push(jsonData[eName][col])
        }
    }

    const obtainFileAsync = async () =>{
        let [data, setData] = useState([]);
        data = [];
        await fetch("http://167.248.46.73:5000/xlsxFile")
        .then(response => {
            return response.json()
        } )
        .then(jsonRes =>{
           
            

            for (let employeeName in jsonRes){
                console.log(employeeName)
                if (employeeName.toLowerCase() != "days" && employeeName.toLowerCase() != "special" && employeeName.toLowerCase() != "projected" && employeeName.toLowerCase() != "mgr/supervisor" && employeeName.toLowerCase() != "team"){
                    data.push( {label: employeeName, value: employeeName} );
                    
                }
            }
            
            setJson(jsonRes);
            
        })

    }

    

    

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.fitIn} scrollEnabled={false}>

            <ElementDropDown.Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select name' : '...'}
          searchPlaceholder="Search..."
          value={dropValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setDropValue(item.value);
            compareTimes(item.value)
            setIsFocus(false);
          }}
            ></ElementDropDown.Dropdown>

        {
            dropValue ?
            <View style={styles.parentView}>
                <View style={styles.childView}>
                    <Text style={styles.dayLabel}>Monday: </Text>
                    <Text style={styles.timeLabel}>{jsonData[dropValue][0]}</Text>
                </View>

                <View style={styles.childView}>
                    <Text style={styles.dayLabel}>Tuesday: </Text>
                    <Text style={styles.timeLabel}>{jsonData[dropValue][1]}</Text>
                </View>

                <View style={styles.childView}>
                    <Text style={styles.dayLabel}>Wednesday: </Text>
                    <Text style={styles.timeLabel}>{jsonData[dropValue][2]}</Text>
                </View>

                <View style={styles.childView}>
                    <Text style={styles.dayLabel}>Thursday: </Text>
                    <Text style={styles.timeLabel}>{jsonData[dropValue][3]}</Text>
                </View>

                <View style={styles.childView}>
                    <Text style={styles.dayLabel}>Friday: </Text>
                    <Text style={styles.timeLabel}>{jsonData[dropValue][4]}</Text>
                </View>

                <View style={styles.childView}>
                    <Text style={styles.dayLabel}>Saturday: </Text>
                    <Text style={styles.timeLabel}>{jsonData[dropValue][5]}</Text>
                </View>

                <View style={styles.childView}>
                    <Text style={styles.dayLabel}>Sunday: </Text>
                    <Text style={styles.timeLabel}>{jsonData[dropValue][6]}</Text>
                </View>


            </View> 

            
            

            :null
        }
        

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
        
    },

    dayLabel:{
        color: 'darkorange',
        fontSize: 25,
    },

    timeLabel:{
        fontSize: 20,
        marginLeft: 20
    },

    childView:{
        flex: 1
    },

    parentView: {
        display: 'flex'
    },

    fitIn: {
        height: "100%",
        width: "100%",
        margin: '5%',
        padding: '5%',
        
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

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
      },

    placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})


export default SpreadSheetScreen;