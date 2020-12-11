import React from 'react'
import {StyleSheet, View, Text,Image} from 'react-native'
import AudioContent from './Audio'

//regarder affichage conditionale + Ancrage barre de recherche + sound

class ContentItem extends React.Component
{
    render()
    {
        const info = this.props.content
        console.log("****DEBUG****")
        console.log(info.photo)
        return(
            <View style={styles.mainFrame}> 
                <View style={styles.posterInfo}>
                    <View style={styles.user}>
                        <Image
                            style={styles.image}
                            source={{uri: 'https://www.creads.fr/app/uploads/sites/1/2017/09/xlogo-tinder.png.pagespeed.ic.4Rb5KKNMhK.png'}}
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
                        source={require('../images/minilogo.png')}
                    />   
                    <AudioContent />       
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
            height:250,
            width: 250,
            justifyContent :'center',
            alignItems:'center',
            margin: 5,
            backgroundColor: 'white'
        },
        username:
        {
            alignItems:'center'
        }

    }
    
)

export default ContentItem