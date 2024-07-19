import Constants from 'expo-constants';
import { ScrollViewStyleReset } from 'expo-router/html';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert, ScrollView, Switch, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

 export const Patientaddcaretaker = () => {
  const [username, setUsername] = useState  ('');
  const [isEnabled, toggleSwitch] = useState(false);


    //  function toggleSwitch(value: boolean): void | Promise<void> {
    //     //  throw new Error('Function not implemented.');
    //  }

  return (
    
    <View style={styles.container}>
    <Text style={styles.title}>Add Care Taker</Text>
     
      <TextInput
        style={styles.input}
        placeholder="Search Care Taker"
        onChangeText={setUsername}
        value={username}
      />

      <View style={styles.caretakerlist}>
                <View style={styles.caretakerdetails}>
                    <Text style={styles.name}>Elena</Text>
                    <View style={styles.iconmain}>
                    <Icons name="add-circle" size={27} color={'white'}/>
                    </View>
                </View>
                <View style={styles.caretakerdetails}>
                    <Text style={styles.name}>Klaus</Text>
                    <View style={styles.iconmain}>
                    <Icons name="add-circle" size={27} color={'white'}/>
                    </View>
                </View>
                <View style={styles.caretakerdetails}>
                    <Text style={styles.name}>Rakzz</Text>
                    <View style={styles.iconmain}>
                    <Icons name="add-circle" size={27} color={'white'}/>
                    </View>
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
    paddingVertical: 20,
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
  },
  caretakerlist:{
    marginTop:33,
    gap:12, 
  },
  caretakerdetails:{
    backgroundColor:'#585484',
    width:370,
    height:60,
    justifyContent:'space-between',
    paddingLeft:10,
    borderRadius:9,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10,
  },
  name:{
    fontSize:16,
    color:'white'
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderRadius:9,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop:50,
    width:370,
  },
  iconmain:{
    display:'flex',
    flexDirection:'row',
    gap:8
  }
});

export default Patientaddcaretaker;
