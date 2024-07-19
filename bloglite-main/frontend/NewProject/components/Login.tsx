import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert, ActivityIndicator} from 'react-native';
import axios from 'axios'

 export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

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

  const handlePress =  async () => {
    try {
      const res = await axios.get('http://192.168.204.234:5000/api/userpatient/6');
      console.log(res)
    } catch (error) {
      console.error('Network request failed:', error); // Log error to console
      Alert.alert('Error', 'Network request failed. Please try again later.');
    }
    
    
  };

  
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

<Text style={styles.output}>You entered: {username}</Text>
      <Text style={styles.output}>You entered: {password}</Text>

      <Button
        title="Press me"
        color="#f194ff"
        onPress={handlePress}
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

export default Login;
