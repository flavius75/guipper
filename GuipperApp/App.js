import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Search from './Components/Search' //import du component Search créée
import Publication from './Components/Publication' //import de notre templaite du reseau social
import {Permissions} from 'expo'

export default function App() {
  return (
    //affichage app 
   <View style={styles.main}>
      <View style={styles.search}> 
        <Search/>
      </View>  
      <View style={styles.content}>
        <Publication />
      </View>
      <View style={styles.nav}>
        <Text>Navigation</Text>
      </View>
    </View>
  );
}
//<Publication/>
const styles = StyleSheet.create(
  {
    main:
    {
      flex:1,
      justifyContent:'space-between'
    },
    nav:
    {
      flex:1,
      //borderWidth: 5,
      justifyContent:'flex-end',
      alignItems:'center'
    },
    search:
    { 
      flex:2,
      //borderWidth: 5,
      justifyContent:'flex-end',
      alignItems:'center'
      
    },
    content:
    {
      flex:16,
      //justifyContent:'center',
      //alignItems:'center'
    }
  }
)

