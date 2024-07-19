import Constants from 'expo-constants';
import { ScrollViewStyleReset } from 'expo-router/html';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert, ScrollView, Switch, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

 export const Patientsettings = () => {
  const [username, setUsername] = useState  ('');
  const [isEnabled, toggleSwitch] = useState(false);


    //  function toggleSwitch(value: boolean): void | Promise<void> {
    //     //  throw new Error('Function not implemented.');
    //  }

  return (
    
    <View style={styles.container}>
    <Image
        source={require('../assets/images/patient.jpg')}
        style={styles.image}
      />
    <Text style={styles.title}>Damon</Text>
      <View style={styles.menu}>
          <Text style={styles.label}>Care Taker</Text>
          <Icons name="add-circle" size={30} color={'black'}/>
      </View>

      <View style={styles.caretakerlist}>
                <View style={styles.caretakerdetails}>
                    <Text style={styles.name}>Elena</Text>
                </View>
                <View style={styles.caretakerdetails}>
                    <Text style={styles.name}>Elena</Text>
                </View>
                <View style={styles.caretakerdetails}>
                    <Text style={styles.name}>Elena</Text>
                </View>
        </View>
    </View>
    

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  menu:{
    // backgroundColor:'pink',
    width:370,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:50,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover', // or 'contain', 'stretch', etc.
    borderRadius:200,
  },  
  label: {
    fontSize: 18,
  },
  output: {
    fontSize: 18,
  },
  title: {
    fontSize: 23,
    fontWeight: '500',
    textAlign:'center',
    marginTop:20
  },
  caretakerlist:{
    marginTop:13,
    gap:12, 
  },
  caretakerdetails:{
    backgroundColor:'#585484',
    width:370,
    height:60,
    justifyContent:'center',
    paddingLeft:10,
    borderRadius:9,
  },
  name:{
    fontSize:16,
    color:'white'
  }
});

export default Patientsettings;
