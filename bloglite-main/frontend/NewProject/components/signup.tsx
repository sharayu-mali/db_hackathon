import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert, ActivityIndicator} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

 export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(new Date());
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Network request failed:', error); // Log error to console
      Alert.alert('Error', 'Network request failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  // const handlelogin = () =>{
  //   try {
  //     alert("HHUJIKO")
  //     console.log('cgfhjk')
  //     // const res = await axios.get('http://192.168.204.234:5000/api/userpatient/6');
  //     // setResponse(res.data.response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


  const postData = async () => {
    setLoading(true);
    try {
        const payload = {
            "username": username,
            "dob": dob,
            "location":location,
            "email": email,
            "phone": phone,
            "password": password
        
        }
      const response = await fetch('http://192.168.204.234:5000/api/userpatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

   

  
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Sign-Up</Text>

      <Text style={styles.label}>Enter Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username "
        onChangeText={setUsername}
        value={username}
      />

      <Text style={styles.label}>Enter Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Text style={styles.label}>Enter Location:</Text>
      <TextInput
        style={styles.input}
        placeholder="Location"
        secureTextEntry={true}
        onChangeText={setLocation}
        value={location}
      />
     <Text style={styles.label}>Enter phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        secureTextEntry={true}
        onChangeText={setPhone}
        value={phone}
      />
      <Text style={styles.label}>Enter Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        secureTextEntry={true}
        onChangeText={setEmail}
        value={email}
      />

<Text style={styles.output}>You entered: {username}</Text>
      <Text style={styles.output}>You entered: {password}</Text>

      <Button
        title="Sign Up"
        color="#f194ff"
        onPress={postData}
      />
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
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
    fontSize: 33,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom:70
  },
});

export default SignUp;
