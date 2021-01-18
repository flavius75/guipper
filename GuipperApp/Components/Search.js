import React from 'react'
import {View, TextInput, Button,FlatList,Text,Image} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import {getAPI} from "../API/APITest"

class Search extends React.Component
{
    constructor(props) {
        super(props)
        this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
        this.state = {films: []}
      }

      _APITest()
      {
          getAPI().then(data=>console.log(data))
      }

    
  _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    console.log(this.searchedText)//texte recupére de TextInput 
  }

    render()
    {
        return(
            // Ici on rend à l'écran les éléments graphiques de notre component custom Search
            <View style={styles.main}>
                <Image
                    style={styles.image}
                    source={require('../images/minilogo.png')}
                />
                <TextInput placeholder='Look for me' style={{flex:1}} onChangeText={(text) => this._searchTextInputChanged(text)} />
                <FontAwesome.Button name="search" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={this._APITest}>
                </FontAwesome.Button>
            </View>
        )
    }
}

const styles = {
    main:
    {
        //flex:1,
        flexDirection:'row',
        
    },
    button:
    {
        justifyContent : 'flex-end'
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


//export de notre component 
export default Search