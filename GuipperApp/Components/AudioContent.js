import React from 'react'
import {StyleSheet, View, Text,Image,FlatList} from 'react-native'
import AudioContent from './MyAudio'
import { FontAwesome } from '@expo/vector-icons';

class ContentItem extends React.Component
{
    

    render()
    {
        //console.log("****DEBUG****")
        const info = this.props.MysoundContent
        return(
            <View style={styles.mainFrame}> 
                <View >
                    <AudioContent song={info.content} photo={info.photo}/>
                </View>
                <View style={{flex:1}}>
                    <Text numberOfLines={3} style={styles.text}>{info.name}</Text>
                    <FontAwesome name="trash-o" size={24} color="black" style={{justifyContent:"flex-end"}}/>
                </View>
            </View>
        )
      }
    }  

const styles = StyleSheet.create(
    {
        mainFrame:
        {
            //borderWidth: 5,
            flexDirection :'row',
            flex:1
        },
        text:
        {
            textAlign:"justify"
        },
    }
    
)

export default ContentItem