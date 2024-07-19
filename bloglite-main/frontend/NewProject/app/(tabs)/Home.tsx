import Constants from 'expo-constants';
import { ScrollViewStyleReset } from 'expo-router/html';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Alert, ScrollView, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

 export const Home = () => {
  const [username, setUsername] = useState  ('');
  const [isEnabled, toggleSwitch] = useState(false);


    //  function toggleSwitch(value: boolean): void | Promise<void> {
    //     //  throw new Error('Function not implemented.');
    //  }

  return (
    <View style={styles.container}>
        
        <View style={styles.navbar}>
        <Icons name="information-circle" size={30} color={'blue'} />
        <Icons name="alert-circle" size={30} color={'red'}/>
        </View>

      <Text style={styles.username}>Hello, Rakshanda !</Text>
      <Text style={styles.greeting}>Goodmornig</Text>


      <Text style={styles.label}>Going Out ?</Text>
      
      <TextInput
        style={styles.input}
        placeholder="location"
        onChangeText={setUsername}
        value={username}
      />

        <Text style={styles.currenttasklabel} >Current task</Text>
        
        <View style={styles.taskmain}>
        <ScrollView  horizontal={true} contentContainerStyle={styles.taskcontainer} >

            <View style={styles.task}>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                <Text style={styles.tasklabel}>Going Out ljnvjldfnljn?</Text>
            </View>

            <View style={styles.task}>
                <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                <Text style={styles.tasklabel}>Going Out ljnvjldfnljn?</Text>

            </View>

            <View style={styles.task}>
                <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                <Text style={styles.tasklabel}>Going Out ljnvjldfnljn?</Text>

            </View>

        </ScrollView>
        </View>

        <Text style={styles.progresslabel} >Today's Progress </Text>
        
            <View style={styles.taskprogresscontainer} >
                <View style={styles.taskprogress}>

                </View>
    
            </View>
            <Text style={styles.progressinfolabel} >Today's Progress </Text>

        <Text style={styles.statisticslabel} >Statistics </Text>
        <View style={styles.statisticsmain}>
            <View style={styles.statisticscontainer}>
                <Text style={styles.numberlabel} >2 </Text>
                <Text style={styles.namelabel} >Incidents </Text>
            </View>
            <View style={styles.statisticscontainer}>
                <Text style={styles.numberlabel} >13 </Text>
                <Text style={styles.namelabel} >Missed </Text>
            </View>
            <View style={styles.statisticscontainer}>
                <Text style={styles.numberlabel} >23 </Text>
                <Text style={styles.namelabel} >Completed </Text>
            </View>
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
    fontSize: 33,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom:200
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

export default Home;
