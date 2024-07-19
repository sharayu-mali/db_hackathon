import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert, TouchableOpacity} from 'react-native';
import axios from 'axios'
import Icons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'

export const Alarm = () => {
    const handlePress = () => {
        alert('Button Pressed!');
      };

  return (
    <View style={styles.container}>
      <Text style={styles.routine}>07:00</Text>
      <Text style={styles.routine}>Breakfast</Text>

      <Icons name="information-circle" size={130} color={'blue'} style={styles.emojie}/>


      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttontext}>DONE</Text>
      </TouchableOpacity>

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
    marginTop:50,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  routine: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom:23,
  },
  emojie:{
    marginTop:100,
    marginBottom:200,
  },
  button:{
    width:200,
    height:70,
    backgroundColor:'gray',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:9,
  },
  buttontext:{
    fontSize:23,
  }
});

export default Alarm;
