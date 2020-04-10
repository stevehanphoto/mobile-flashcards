import React, { useState, useContext } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Button, Text, ShadowPropTypesIOS } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DeckListView from './DeckListView'
import NoCardMsg from './NoCardMsg'
import NewQuestionView from './NewQuestionView'
import { DecksContext } from '../context/DecksContext';

export default function DeckView({ route }) {
    const { decks, deleteDeck } = useContext(DecksContext)
    const { deckId } = route.params
    const deck = decks[deckId]
//    const [currentCard, setCard] = useState('0')
    const navigation = useNavigation();

    const handleAddCard = () => {
        navigation.navigate('NewQuestionView', { deckId, name: decks[deckId].title })
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
            <View style={styles.item}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.content}>{deck.questions.length} cards</Text>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: "blue" }]} onPress={handleAddCard}>
                    <Text style={{ color: 'white' }}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleStartQuiz} style={[styles.buttonStyle, { backgroundColor: "black" }]}>
                    <Text style={{ color: 'white' }}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleDeleteDeck} style={[styles.buttonStyle, { backgroundColor: "none" }]}>
                    <Text style={{ color: 'blue' }}>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 20,
    },
    item: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 32,
        color: 'black',
    },
    content: {
        fontSize: 16,
        color: 'darkgrey',
    },
    buttonStyle: {
        color: 'white',
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 35,
        alignItems: 'center'
    }
});
