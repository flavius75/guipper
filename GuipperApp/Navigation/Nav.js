// Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Feed from '../Components/Feed'
import Record from '../Components/Record'

const SearchStackNavigator = createStackNavigator({
    Home: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Feed,
    navigationOptions: {headerShown: null}
    },
  Record:{
      screen:Record,
      navigationOptions: {headerShown: null}
  }
})
export default createAppContainer(SearchStackNavigator)