import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Button, Text, TextInput,} from 'react-native'
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons'; 
import RecordFunction from './RecordFunction'
import Notification from './Notification'


class Record extends React.Component
{
    _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
        console.log(this.searchedText)//texte recupére de TextInput 
      }

    render()
    {
        return(
           <View style={styles.main}>
               <View style={styles.head}>
                    <Image
                            style={styles.image}
                            source={require('../images/minilogo.png')}
                    />
                    <TextInput placeholder='Name your song' style={{flex:1}} onChangeText={(text) => this._searchTextInputChanged(text)} />
                    <FontAwesome.Button name="search" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={null}></FontAwesome.Button>
               </View>

               <View style={styles.body}>
                    <RecordFunction />
                    <Notification />
               </View>

               <View style={styles.nav}>
                    <FontAwesome.Button name="home" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={()=>this.props.navigation.navigate("Home")}></FontAwesome.Button>
                    <FontAwesome.Button name="music" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={()=>this.props.navigation.navigate("MySounds")}></FontAwesome.Button>
                    <FontAwesome.Button name="circle-o-notch" size={22} color="#C31432" onPress={()=>this.props.navigation.navigate("Record")} backgroundColor='#FFFFFF'></FontAwesome.Button>
                    <FontAwesome.Button name="compass" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={null}></FontAwesome.Button>
                    <FontAwesome.Button name="navicon" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={()=>this.props.navigation.navigate("Profile")}></FontAwesome.Button>
               </View>
           </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        head:
        {
            flex:3,
            flexDirection:'row',
            alignItems : 'flex-end'
        },
        main:
        {
            flex:1,
            backgroundColor:"white"
        },
        body:
        {
            flex:23,
            justifyContent : 'center',
            alignItems:'center'
        },
        nav:
        {
          flex:2,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
        },
        image:
        {
            width: 30,
            height: 30,
            margin: 5,
            backgroundColor: 'white',
            justifyContent : 'flex-start'
        }
    }
  )
export default Record