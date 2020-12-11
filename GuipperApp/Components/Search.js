import React from 'react'
import {View, TextInput, Button,FlatList,Text,Image} from 'react-native'
import films from '../Helper/filmData'

class Search extends React.Component
{
    render()
    {
        return(
            // Ici on rend à l'écran les éléments graphiques de notre component custom Search
            <View style={styles.main}>
                <Image
                    style={styles.image}
                    source={require('../images/minilogo.png')}
                />
                <TextInput placeholder='Look for'  />
                <Button title="Rechercher" style={styles.button} onPress={()=>{}}/>
            </View>
        )
    }
}

const styles = {
    main:
    {
        flexDirection:'row'
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
        backgroundColor: 'white'
    }
}


//export de notre component 
export default Search