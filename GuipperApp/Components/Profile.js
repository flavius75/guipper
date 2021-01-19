import React from 'react';
import { StyleSheet, Text, View, Image,FlatList} from 'react-native';
import Search from './Search' //import du component Search créée
import { FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import MyContent from '../Helper/MyContent'
import MyContentItem from './MyContentItem'

//creation d'una page de profil

class Profile extends React.Component
{
    render()
    {
        return(
            <View style={styles.main}>
                <View style={{flex:2}}></View>
                <View style={styles.pp}>
                    <Image
                        source={require('../images/Logo1.png')}
                        style={{position:"absolute",width:"100%",height:"100%",opacity:0.5}}
                    />
                    <Image 
                        source={require('../images/joao.jpg')}  
                        style={{width: 100, height: 100, borderRadius: 400/ 2,}} 
                    />
                    <Text style={{fontSize: 20,fontWeight: "bold"}}>
                        Guipper Admin
                    </Text>
                </View>
                <View style={styles.content}>
                    <FlatList
                        data={MyContent}
                        keyExtractor={(item)=>item.id.toString()}
                        renderItem={({item})=><MyContentItem MyContent={item}/>}
                    />
                </View>
                <View style={styles.nav}>
                    <FontAwesome.Button name="home" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={()=>this.props.navigation.navigate("Home")}></FontAwesome.Button>
                    <FontAwesome.Button name="music" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={()=>this.props.navigation.navigate("MySounds")}></FontAwesome.Button>
                    <FontAwesome.Button name="circle-o-notch" size={22} color="#C31432" onPress={()=>this.props.navigation.navigate("Record")} backgroundColor='#FFFFFF'></FontAwesome.Button>
                    <FontAwesome name="compass" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={null}></FontAwesome>
                    <FontAwesome.Button name="navicon" backgroundColor='#FFFFFF' color="#000000" size={22} onPress={()=>this.props.navigation.navigate("Profile")}></FontAwesome.Button>
                </View>

            </View>
        )
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
      pp:
      { 
        flex:7,
        justifyContent:'flex-end',
        alignItems:'center'
      },
      content:
      {
        flex:23,
      }
    }
  )

  export default Profile