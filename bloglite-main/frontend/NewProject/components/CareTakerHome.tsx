import Constants from 'expo-constants';
import { ScrollViewStyleReset } from 'expo-router/html';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert, ScrollView, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

 export const CareTakerHome = () => {
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

      <Text style={styles.title}>Track Patient Location</Text>

      <TextInput
        style={styles.input}
        placeholder="Search Patient"
        onChangeText={setUsername}
        value={username}
      />

        <Text style={styles.location} >Pune</Text>
        <View style={styles.mapmain}>

        </View>
      {/* <Button
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      /> */}

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
    fontWeight: 'bold',
  },
  mapmain:{
    width:370,
    height:200,
    backgroundColor:'gray',
    marginTop:10
  }
});

export default CareTakerHome;
