import Constants from 'expo-constants';
import { ScrollViewStyleReset } from 'expo-router/html';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert, ScrollView, Switch,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import Patientsettings from '@/components/Patientsettings';
import Patientaddcaretaker from '@/components/Patientaddcaretaker';

 export const patientprofile = () => {

  const [username, setUsername] = useState  ('');
  const [isEnabled, toggleSwitch] = useState(false);


    //  function toggleSwitch(value: boolean): void | Promise<void> {
    //     //  throw new Error('Function not implemented.');
    //  }

  return (

    <View style={styles.container}>
        
      {/* <Text style={styles.username}>Hello, Rakshanda !</Text> */}
     
    <Patientsettings/>
    {/* <Patientaddcaretaker/> */}
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
});

export default patientprofile;
