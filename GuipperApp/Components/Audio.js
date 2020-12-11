import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Button } from 'react-native'
import {SoundPlayer} from 'react-native-sound-player'
import Content from '../Helper/Content'
import ReactAudioPlayer from 'react-audio-player';
import { Sound } from 'expo-av/build/Audio';
import { Audio } from 'expo-av';
/*
class AudioContent extends React.Component
{ 
  /*AudioContent() //tenta não esquecer que on construtor tem o mesmo nome que a class parvalhão
  {
    console.log("****DEBUG****")
    const trackPath = '../media/Deadly Premonition-Life is Beautiful.mp3'
    console.log(typeof(trackPath))

    //DEBUG
    try {
      SoundPlayer.playUrl(trackPath)
  } catch (e) {
      console.log(`cannot play the sound file`, e)
  }
  }

  render()
  {
    return(
      <Button
      titleStyle={{ fontSize: 40, fontWeight: '70', padding: 50 }} 
      title={'Play'}
      onPress={}/>
    )
  }}*/

  export default function AudioContent() {
    const [sound, setSound] = React.useState();
    //ajouter controls et progress bar et les musiques ne peuvent pas avoir d'espace 
    //verifier avec fonctionalité complete 
    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(require('../media/DeadlyPremonition-LifeisBeautiful.mp3'));
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();}
  
    React.useEffect(() => {
      return sound ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();} : undefined;
    }, [sound]);
  
    return (
      <View >
        <Button title='Play Sound' onPress={playSound} />
      </View>
    );
  }