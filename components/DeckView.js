import React, { useState, useContext } from 'react';
import { SafeAreaView, View, FlatList, Text, ShadowPropTypesIOS } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { StackActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DeckListView from './DeckListView'
import NoCardMsg from './NoCardMsg'
import NewQuestionView from './NewQuestionView'
import { DecksContext } from '../context/DecksContext';
import { styles } from './styles'

export default function DeckView({ route }) {
    const { decks, deleteDeck } = useContext(DecksContext)
    const { deckId } = route.params
    const deck = decks[deckId]
    const navigation = useNavigation()

    navigation.setOptions({ title: deckId })

    const handleAddCard = () => {
        navigation.navigate('NewQuestionView', { deckId })
    }

    const handleStartQuiz = () => {
        if (deck.questions.length === 0) {
            let pushAction = StackActions.push('NoCardMsg');
            navigation.dispatch(pushAction);
        }
        else {
            navigation.navigate('QuizView', { deckId })
        }
    }

    const handleDeleteDeck = () => {
        deleteDeck(deckId)
        navigation.navigate('DeckListView')
    }
    
    if (typeof deck === 'undefined') return null
    
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#ff9a9e", "#fad0c4", "#fad0c4"]}
          style={styles.item}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.num}>{deck.questions.length} cards</Text>
          </View>
        </LinearGradient>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "blue" }]}
            onPress={handleAddCard}
          >
            <Text style={{ color: "white" }}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleStartQuiz}
            style={[styles.button, { backgroundColor: "black" }]}
          >
            <Text style={{ color: "white" }}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteDeck}
            style={[styles.button, { backgroundColor: "none" }]}
          >
            <Text style={{ color: "blue" }}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}
