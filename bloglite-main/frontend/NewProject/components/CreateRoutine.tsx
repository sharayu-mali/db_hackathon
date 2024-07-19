import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert} from 'react-native';
import axios from 'axios'
import Icons from 'react-native-vector-icons/Ionicons';
// import DatePicker from 'react-native-date-picker'

export const CreateRoutine = () => {
    const [routinename, setRoutineName] = useState('');
    const [password, setPassword] = useState('');
    
  const [date, setDate] = useState(new Date())
  
    const handlelogin = async() =>{
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/data');
        // setResponse(res.data.response);
      } catch (error) {
        console.error(error);
      }
    }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Routine</Text>

      <Text style={styles.label}>Enter Routine Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Activity"
        onChangeText={setRoutineName}
        value={routinename}
      />

      <Text style={styles.label}>Enter Emojie:</Text>
      <TextInput
        style={styles.input}
        placeholder="Emojie"
        onChangeText={setPassword}
        value={password}
      />

{/* <DatePicker date={date} onDateChange={setDate} /> */}
        
<Text style={styles.output}>You entered: {routinename}</Text>
      <Text style={styles.output}>You entered: {password}</Text>

      <Button
        title="Create Routine"
        color="#f194ff"
        onPress={handlelogin}
      />

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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom:50,
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
});

export default CreateRoutine;
