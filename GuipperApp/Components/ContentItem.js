import React from 'react'
import {StyleSheet, View, Text,Image,FlatList} from 'react-native'
import AudioContent from './Audio'
import Song from './Audio'

//regarder affichage conditionale + Ancrage barre de recherche + source image par variable

class ContentItem extends React.Component
{
    render()
    {
        //console.log("****DEBUG****")
        const info = this.props.content
        //console.log(info.photo)
        return(
            <View style={styles.mainFrame}> 
                <View style={styles.posterInfo}>
                    <View style={styles.user}>
                        <Image
                            style={styles.image}
                            source={info.photo}
                        />
                        <Text style={styles.username}>{info.artist}</Text>
                    </View>

                    <View style={styles.description}>  
                        <Text numberOfLines={3}>
                            {info.description}
                        </Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text>Infos à afficher</Text>
                    <Image
                        style={styles.imageMain}
                        source={info.photo}
                    /> 
                    <AudioContent song={info.content} />
                </View>

                <View style={styles.feedback}>
                    <Text>Coment like share</Text>
                </View>
            </View>
        )
      }
    }


    //Content il faut le remplacer par une FlatList, et la rendre dinamique
    //Voir aussi ScrollView    

const styles = StyleSheet.create(
    {
       user: 
        {
            
            flexDirection :'row',
            justifyContent : 'flex-start'

        },
        description:
        {
            
            justifyContent:"flex-start",
            alignItems: 'flex-start'
        },
        content:
        {
            justifyContent : 'center',
            alignItems:'center'
        },
        feedback:
        {
            //borderWidth: 5,
            justifyContent: "flex-end",
            alignItems: 'flex-start'
        },
        mainFrame:
        {
            //borderWidth: 5,
            flex:3
        },
        posterInfo:
        {
            //borderWidth: 5
        },
        image:
        {
            width: 30,
            height: 30,
            margin: 5,
            backgroundColor: 'white'
        },
        imageMain:
        {
            height:350,
            width: 350,
            justifyContent :'center',
            alignItems:'center',
            backgroundColor: 'white'
        },
        username:
        {
            alignItems:'center'
        }

    }
    
)

export default ContentItem