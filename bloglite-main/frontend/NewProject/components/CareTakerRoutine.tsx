import Constants from 'expo-constants';
import { ScrollViewStyleReset } from 'expo-router/html';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert, ScrollView, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

 export const CareTakerRoutine = () => {
  const [username, setUsername] = useState  ('');
  const [isEnabled, toggleSwitch] = useState(false);


    //  function toggleSwitch(value: boolean): void | Promise<void> {
    //     //  throw new Error('Function not implemented.');
    //  }

  return (
    <View style={styles.container}>
        
        <View style={styles.navbar}>
        <Icons name="information-circle" size={30} color={'#585484'} />
        <Icons name="alert-circle" size={30} color={'#9c1919'}/>
        </View>

      <Text style={styles.title}>Track Patient Routine</Text>

      <TextInput
        style={styles.input}
        placeholder="Search Patient"
        onChangeText={setUsername}
        value={username}
      />

        <View style={styles.main}>
        <Text style={styles.label}>Daliy Tasks</Text>
        <Icons name='add-circle' size={30} color={'black'}/>
        </View>
     
        <View style={styles.routinelist}>
            <View style={styles.routinecontainer}>
                <View style={styles.routinetimecontainer}>
                    <Text style={styles.label}>06:00</Text>
                </View>
                <View style={styles.routinedetailscontainer}>
                    <Text style={styles.routinelabel}>Breakfast</Text>
                </View>
            </View>

            <View style={styles.routinecontainer}>
                <View style={styles.routinetimecontainer}>
                    <Text style={styles.label}>06:00</Text>
                </View>
                <View style={styles.routinedetailscontainer}>
                    <Text style={styles.routinelabel}>Breakfast</Text>
                </View>
            </View>

            <View style={styles.routinecontainer}>
                <View style={styles.routinetimecontainer}>
                    <Text style={styles.label}>06:00</Text>
                </View>
                <View style={styles.routinedetailscontainer}>
                    <Text style={styles.routinelabel}>Breakfast</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 50,

  },
  navbar:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    gap:13,
    marginTop:10,
    marginBottom:30,
  }, 
  location:{
    fontSize:18,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderRadius:9,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop:40
  },
  output: {
    fontSize: 18,
  },
  title: {
    fontSize: 33,
    fontWeight: '400',
    justifyContent:'center',
  },
  mapmain:{
    width:370,
    height:200,
    backgroundColor:'gray',
    marginTop:10
  },  main:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    // backgroundColor:'green',
    marginBottom:30,
  },
  routinelist:{
    gap:10,
  },
  routinecontainer:{
    display:'flex',
    flexDirection:'row',
    height:70,
  },
  routinetimecontainer:{
    // backgroundColor:'yellow',
    width:100,
    justifyContent:'center'

  },
  routinedetailscontainer:{
    backgroundColor:'#585484',
    justifyContent:'center',
    borderRadius:9,
    width:270,
    padding:10,
  },
  
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  routinelabel:{
    color:'white',
    fontSize: 18,
  }
});

export default CareTakerRoutine;
