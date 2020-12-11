//Publication List, ajouter ContentItem dans la liste

import React from 'react'
import{StyleSheet, Vieww, Text,Image, FlatList} from 'react-native'
import content from '../Helper/Content'
import ContentItem from './ContentItem'

class Publication extends React.Component
{
    render()
    {
        return(
            <FlatList
            data={content}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=><ContentItem content={item}/>}
            />
        )
    }
}

export default Publication