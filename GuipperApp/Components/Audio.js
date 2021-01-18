import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Button } from 'react-native'
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons'; 


 let state = true //varible qui permet de savoir si on passe par la premiere fois ou deuxieme fois par le boutton
 let icon = "play-circle-o"
 let backgroundIcon = "square"

 export default function AudioContent(song)
    { 
      console.clear()
      const test =song//on recupere les infos passées en parametre par le props de ./ContentItem
      
      const [sound, setSound] = React.useState();
      
      
      function play()//fonction à appeler avec le boutton qui permet d'appeler la fonction qui gere le fait de jouer du son
      {
        if(state)
        {
          icon=null
          backgroundIcon=null
          playSound(test)
        }
        else{
          icon="play-circle-o"
          backgroundIcon="square"
          playSound(test)
        }

      }

      async function playSound(test) 
      {
        const { sound } = await Audio.Sound.createAsync(test.song,{
          progressUpdateIntervalMillis: 500,
          positionMillis: 0,
          shouldPlay: false,
          rate: 1.0,
          shouldCorrectPitch: false,
          volume: 1.0,
          isMuted: false,
          isLooping: false,
        });//Creation de notre son
        setSound(sound);
      
        if(state)//premier appye play
        {
          console.log('Playing Sound'+"->"+test.song);//DEBUG
          await sound.playAsync();//play
          state=false
          
        }
        else//deuxime appuuye stop
        {
          console.log('Stopping Sound'+"->"+test.song);//DEBUG
          await sound.pauseAsync();//stop
          state=true
          
        }
        //S'il y a des erreurs c'est ici -> barre de progression
      


        //
      }

      React.useEffect(() => {
        return sound ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();} : undefined;
      }, [sound]);


      
      //Affichage du Button permet de jouer ou stopper la musique
      return(
        <View style={{flex:1}}>
          <TouchableOpacity onPress={play} >
            <Image source={test.photo} style={styles.image} />
            <FontAwesome name={backgroundIcon} size={148} color="black" style={{position:"absolute",top:"33%",right:"33%",opacity:0.5}}/>
            <FontAwesome name={icon} size={150} color="white"  style={{position:"absolute",top:"33%",right:"33%",opacity:0.88}}/>
            
          </TouchableOpacity>
        </View>
      )
    }

    const styles = StyleSheet.create(
      {
        image:
        {
          height:400,
          width: "100%",
          justifyContent :'center',
          alignItems:'center',
          backgroundColor: 'white'
      },
      content:
      {
        width: "100%",
        justifyContent : 'center',
        alignItems:'center'
      },
      }
    )


    

