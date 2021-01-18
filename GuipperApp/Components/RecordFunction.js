import  React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Button, Text, TextInput, } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Audio } from 'expo-av'; 


const flav = "http://93.27.221.66:3000/api/records"
const pts = "https://ptsv2.com/t/GuipperApp/post"

let icon = "circle"
let backgroundIcon = "circle-o"
let setColor = "#c31432"
let state = true

export default function RecordFunction() {
  const [recording, setRecording] = React.useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording()
  {
    console.log('Stopping recording..');
    setRecording(recording);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);


    var sound = {
      uri: uri,
      type: 'audio/mp4',
      name: 'sound.jpg',
    };
      const data = new FormData();
      data.append('record', sound);
      data.append('title', 'Enregistrement');
  
      let request = fetch('http://93.27.221.66:3000/api/records', {
        method:'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjQsImlhdCI6MTYxMDg3OTQxN30.oIzHHZWLhcEnTB-2q1Iyf8KtXez5o4pFbaf1CRsFPBc ' 
        },
        body: data
    }).then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }

  function go()
  {
    if(state)
    {
      icon="pause"
      setColor="black"
      startRecording()  
      state=false
    }
    else
    {
      icon="circle"
      setColor="#c31432"
      stopRecording()
      state=true
    }


  }

  return (
    <View style={{flex:1}}>
      <View style={{flex:1}} >
        <Text style={styles.title}>Instructions</Text>
        <Text style={styles.text}>Work in progress, trying to catch the sound from the smartphone to send to Guipper servers</Text>
        <FontAwesome name={backgroundIcon} size={160} color="black" backgroundColor="white" style={{position:"absolute",top:"22.75%",right:"33%",opacity:0.5}}></FontAwesome>
        <FontAwesome name={icon} size={80} color={setColor} backgroundColor="white"  style={{position:"absolute",top:"29.5%",right:"42.18%",opacity:0.88}} onPress={go}></FontAwesome>
        <Text style={styles.text}>Press the red circle to start to record</Text>
        <Text style={styles.text}>To stop press the pause Button, the audio file is automaticly sent to our servers</Text>
      </View>
    </View>
  );
  }

  const styles = StyleSheet.create(
    {
      text:
      {
      },
      title:
      {
        textAlign: 'center',
        fontSize:30
      },
      image:
      {
        height:"50%",
        width: "80%",
        justifyContent :'center',
        alignItems:'center',
    },
    }
  )