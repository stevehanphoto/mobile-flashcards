import React, { useContext } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Button, Text, ShadowPropTypesIOS } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DecksContext } from '../context/DecksContext'
import { styles } from './styles'

function Item({ deck, deckId }) {
    const navigation = useNavigation()
    return (
      <LinearGradient
        colors={["#ff9a9e", "#fad0c4", "#fad0c4"]}
        style={styles.item}
      >
        <TouchableOpacity          
          onPress={() => navigation.navigate("DeckView", { deckId })}
          styles={styles.content}
        >
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.num}>{deck.questions.length} cards</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
}

export default function DeckListView() {
    const { decks } = useContext(DecksContext)

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(decks)}
          keyExtractor={(item, index) => item}
          renderItem={({ item }) => (
            <Item deck={decks[item]} deckId={item} />
          )}
        />
      </View>
    );
}
