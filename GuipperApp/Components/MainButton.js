import React from 'react'
import {View, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native'
//import LinearGradient from 'react-native-linear-gradient' //importer pour utiliser les gradients

class MainButton extends React.Component
{
    render()
    {
        return(
            // Ici on rend à l'écran les éléments graphiques de notre component custom Search
            <View> 
                <TouchableOpacity style={styles.button} onPress={() => {}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        button:{
            width: 80,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#C31432',
        }
    }
)

export default MainButton