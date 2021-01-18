import React from 'react';
import { StyleSheet, Text, View, Image,FlatList} from 'react-native';
import Search from './Search' //import du component Search créée
import { FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import content from '../Helper/Content'
import ContentItem from './ContentItem'

class Feed extends React.Component{
  render()
  {
    return (
      //affichage app 
     <View style={styles.main}>
        <View style={styles.search}> 
          <Search/>
        </View>  
        <View style={styles.content}>
        <FlatList
            data={content}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=><ContentItem content={item}/>}
            />
        </View>
        <View style={styles.nav}>
          <FontAwesome.Button name="home" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={()=>this.props.navigation.navigate("Home")}></FontAwesome.Button>
          <FontAwesome.Button name="music" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={null}></FontAwesome.Button>
          <FontAwesome.Button name="circle-o-notch" size={22} color="#C31432" onPress={()=>this.props.navigation.navigate("Record")} backgroundColor='#FFFFFF'></FontAwesome.Button>
          <FontAwesome name="compass" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={null}></FontAwesome>
          <FontAwesome.Button name="navicon" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={null}></FontAwesome.Button>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create(
  {
    main:
    {
      flex:1,
      justifyContent:'space-between',
      backgroundColor:'white'
    },
    nav:
    {
      flex:2,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    search:
    { 
      flex:3,
      //borderWidth: 5,
      justifyContent:'flex-end',
      alignItems:'center'
      
    },
    content:
    {
      flex:23,
    }
  }
)
export default Feed
