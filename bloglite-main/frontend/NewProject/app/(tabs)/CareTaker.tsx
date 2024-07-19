import Constants from 'expo-constants';
import { ScrollViewStyleReset } from 'expo-router/html';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert, ScrollView, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import CareTakerHome from '@/components/CareTakerHome';
import CareTakerRoutine from '@/components/CareTakerRoutine';
import CareTakerAddRoutine from '@/components/CareTakerAddRoutine';
import CareTakerProfile from '@/components/CareTakerProfile';

 export const CareTaker = () => {
  const [username, setUsername] = useState  ('');
  const [isEnabled, toggleSwitch] = useState(false);


    //  function toggleSwitch(value: boolean): void | Promise<void> {
    //     //  throw new Error('Function not implemented.');
    //  }

  return (

    // <CareTakerHome/>
    // <CareTakerRoutine/>
    // <CareTakerAddRoutine/>
    <CareTakerProfile/>
    
  );
};

export default CareTaker;
