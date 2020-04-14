import React, { useEffect } from 'react'
import { 
  SafeAreaView, View, FlatList, StyleSheet, Button, 
  Text, ShadowPropTypesIOS, Dimensions 
} from 'react-native'
import { Notifications } from "expo";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationContainer, useNavigation, useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TouchableOpacity } from 'react-native-gesture-handler'
import DeckListView from './components/DeckListView'
import DeckView from './components/DeckView'
import NewDeckView from './components/NewDeckView'
import NewQuestionView from './components/NewQuestionView'
import QuizView from './components/QuizView'
import NoCardMsg from './components/NoCardMsg'
import { setLocalNotification } from './utils/helpers'
import { DecksProvider } from './context/DecksContext'

const Stack = createStackNavigator()
const NewDeckStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const screenWidth = Math.round(Dimensions.get('window').width);

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DeckListView" component={DeckListView} options={{ title: 'Mobile Flashcards' }} />
      <Stack.Screen name="DeckView" 
        component={DeckView} 
        options={
          ({ route }) => (
            { title: '',
              position: 'absolute',
              left: screenWidth / 2,
              top: 27
            }
          )} />
      <Stack.Screen name="NewQuestionView" component={NewQuestionView} options={{ title: 'Add Card' }} />
      <Stack.Screen name="QuizView" component={QuizView} options={({ route }) => ({ title: route.params.name })} />
      <Stack.Screen name="NoCardMsg" component={NoCardMsg} options={{ title: '' }}/>
    </Stack.Navigator>
  )
}

function NewDeckStackScreen() {
  return (
    <NewDeckStack.Navigator>
      <NewDeckStack.Screen name="NewDeckView" component={NewDeckView} options={{ title: 'Create New Deck' }}/>
      <NewDeckStack.Screen name="NewQuestionView" component={NewQuestionView} options={{ title: 'Add Card' }}/>
    </NewDeckStack.Navigator>
  )
}

function App() {  

  useEffect(() => {
    setLocalNotification()
  }, [])

  return (
    <DecksProvider>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName
              if (route.name == 'Home') 
              {
                iconName = focused ? 'home' : 'home-outline'
              }
              else if (route.name == 'Create Deck')
              {
                iconName = focused ? 'plus-box' : 'plus-box-outline'
              }
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'skyblue',
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Create Deck" component={NewDeckStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </DecksProvider>
  )
}

export default App