import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Button } from 'react-native'
import { Audio } from 'expo-av';
import { render } from 'react-dom';


 let number = 0 //varible qui permet de savoir si on passe par la premiere fois ou deuxieme fois par le boutton

 export default function AudioContent(song)
    { 
      const test =song//on recupere les infos passées en parametre par le props de ./ContentItem
      console.log(test)//DEBUG
      const [sound, setSound] = React.useState();
      //playSound(test)
      
      function play()//fonction à appeler avec le boutton qui permet d'appeler la fonction qui gere le fait de jouer du son
      {
        playSound(test)
      }

      async function playSound(test) 
      {
        console.log('Loading Sound');//DEBUG
        console.log("->"+test.song)//DEBUG
        const { sound } = await Audio.Sound.createAsync(test.song);//Creation de notre son
        //const sound= new Audio.Sound()
        //await sound.loadAsync(song)
        setSound(sound);
      
        //console.log(number)
        if(number%2===0)//premier appye play
        {
          console.log('Playing Sound'+"->"+test.song);//DEBUG
          await sound.playAsync();//play
          number=number+1//incrementation
        }
        else{//deuxime appuuye stop
          console.log('Stopping Sound'+"->"+test.song);//DEBUG
          await sound.pauseAsync();//stop
          number=number+1//incrementation
        }
        //console.log(number)
      }

      React.useEffect(() => {
        return sound ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();} : undefined;
      }, [sound]);


      //Affichage du Button permet de jouer ou stopper la musique
      return(
        <View>
          <Button title='Play Song' onPress={play} />
        </View>
      )
    }


    

