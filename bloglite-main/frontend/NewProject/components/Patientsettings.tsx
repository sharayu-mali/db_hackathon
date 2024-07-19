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
          <Text style={styles.label}>Daliy Tasks</Text>
          <Icons name="alert-circle" size={30} color={'red'}/>
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

  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover', // or 'contain', 'stretch', etc.
    borderRadius:200,
  },  
  navbar:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    gap:13,
    marginTop:10,
    marginBottom:30,
  }, 
  label: {
    fontSize: 18,
    marginBottom: 8,
    marginTop : 50,

  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderRadius:9,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  output: {
    fontSize: 18,
  },
  title: {
    fontSize: 23,
    fontWeight: '400',
    textAlign:'center',
    marginTop:20
  },
  username:{
    fontSize:33,
    fontWeight:"bold",

  }, 
  greeting:{
    fontSize:27,
  },
  task:{
    width:300,
    height:95,
    backgroundColor:'pink',
    display:'flex',
    flexDirection:'row',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:9,
    marginBottom:20,
    gap:8,
  },
  currenttasklabel:{
    fontSize:18,
    marginTop:10,
  },  
  tasklabel:{
    fontSize:16,
  },
  taskcontainer:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    paddingTop: Constants.statusBarHeight,
  },
  taskprogresscontainer:{
    marginTop:10,
    height:23,
    borderRadius:23,
    borderStyle:'solid',
    borderColor:'gray',
    borderWidth:2,

  },
  taskprogress:{
    height:20,
    width:83,
    backgroundColor:'blue',
    borderRadius:23,
  },
  taskmain:{
    marginTop:-13,
    height:125,
  },
  progresslabel:{
    fontSize:18,
    marginTop:25
  },
  statisticsmain:{
    backgroundColor:'green',
    display:'flex',
    flexDirection:'row',
    gap:20,
  },
  statisticscontainer:{
    backgroundColor:'cyan',
    height:110,
    width:110,
    borderRadius:13,
    display:"flex",
    justifyContent:'center',
    alignItems:"center"
  },
  statisticslabel:{
    fontSize:18,
    marginTop:28,
    marginBottom:8,
  },
  numberlabel:{
    fontSize:27,
    fontWeight:'bold',
    
  },
  namelabel:{
    fontSize:18,
    fontWeight:'400',
  },
  progressinfolabel:{
    fontSize:13,
    marginTop:5,
  }
});

export default Patientsettings;
