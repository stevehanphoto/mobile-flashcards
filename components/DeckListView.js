import React, { useContext } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Button, Text, ShadowPropTypesIOS } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DecksContext } from '../context/DecksContext'

function Item({ deck, deckId }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DeckView', { deckId })}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.num}>{deck.questions.length} cards</Text>
        </TouchableOpacity>
    )
}

export default function DeckListView() {
    const { decks } = useContext(DecksContext)

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(decks)}
          keyExtractor={(item, index) => item}
          renderItem={({ item }) => <Item deck={decks[item]} deckId={item} />}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: 'lightgrey',
        borderColor: 'lightgrey',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 20,
        marginVertical: 16,
        marginHorizontal: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10
    },
    title: {
        fontSize: 32,
        color: 'darkslategrey'
    },
})


