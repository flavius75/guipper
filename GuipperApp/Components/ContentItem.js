import React from 'react'
import {StyleSheet, View, Text,Image,FlatList} from 'react-native'
import AudioContent from './Audio'
import { FontAwesome } from '@expo/vector-icons';

let clik=0
class ContentItem extends React.Component
{
    state = {
        likes: String(0)
      };

      addLike = () => {
          let newCount
          if(clik%2==0){
           newCount = Number(this.state.likes) + 1;  
           clik=clik+1
           this.setState({
            likes: String(newCount)
          }); 
          }else{
            newCount = Number(this.state.likes) -1; 
            clik=clik+1
            this.setState({
                likes: String(newCount)
              });  
          }

      };
    
    render()
    {
        //console.log("****DEBUG****")
        const info = this.props.content
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

                <View>
                    <AudioContent song={info.content} photo={info.photo}/>
                </View>

                <View style={styles.feedback}>
                <FontAwesome.Button name="heart-o" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={this.addLike}>{this.state.likes}</FontAwesome.Button>
                <FontAwesome.Button name="commenting-o" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={null}>Comment</FontAwesome.Button>
                <FontAwesome.Button name="share" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={null}>Share</FontAwesome.Button>
                </View>
            </View>
        )
      }
    }  

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
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
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
            width: 35,
            height: 35,
            margin: 5,
            backgroundColor: 'white'
        },
        imageMain:
        {
            height:400,
            width: "100%",
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