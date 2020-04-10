import React, { useState, useContext } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Button, Text, ShadowPropTypesIOS } from 'react-native'
import { useNavigation } from '@react-navigation/native'
//import { createStackNavigator } from '@react-navigation/stack'
//import Constants from 'expo-constants'
//import { DATA } from '../utils/helpers.js'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DeckListView from './DeckListView'
import { DecksContext } from '../context/DecksContext';
import { styles } from './styles'

export default function QuizView({ route }) {
    const navigation = useNavigation();
    const { decks } = useContext(DecksContext)
    const { deckId } = route.params
    const deck = decks[deckId]
    const [currentCard, setCard] = useState(0)
    const [correctCount, incrementCorrect] = useState(0)
    const [isAnswer, showAnswer] = useState(false)
    const totalQuestions = deck.questions.length

    const handleShowAnswer = () => showAnswer(true)
    const handleShowQuestion = () => showAnswer(false)
    const handleCorrect = () => {
        console.log("currentCard:", currentCard)
        console.log("totalQuestions:", totalQuestions)
        incrementCorrect(correctCount+1)
        if (currentCard < totalQuestions-1) {
            setCard(currentCard + 1)
            showAnswer(false)
        }
        else {
            console.log("done")
            alert(`Score: ${correctCount+1}/${totalQuestions}`)
            navigation.navigate('DeckListView')
        }
    }
    const handleIncorrect = () => {
        console.log("currentCard:", currentCard)
        console.log("totalQuestions:", totalQuestions)
        if (currentCard < totalQuestions-1) {
            showAnswer(false)
            setCard(currentCard + 1)
        }
        else {
            console.log("done")
            alert(`Score: ${correctCount}/${totalQuestions}`)
            navigation.navigate('DeckListView')
        }
    }

    return (
        <View style={styles.container}>
            <Text>{currentCard}/{totalQuestions}</Text>
            {isAnswer === false
            ?   <View style={[styles.item, {flex: 2}]}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.content}>{deck.questions[currentCard].question}</Text>
                    <Button title="Show Answer" onPress={handleShowAnswer}></Button>
                </View>
                : <View style={[styles.item, { flex: 2 }]}>
                    <Text style={styles.content}>{deck.questions[currentCard].answer}</Text>
                    <Button title="Show Question" onPress={handleShowQuestion}></Button>
                </View>
            }
            <View style={styles.container}>
                <TouchableOpacity onPress={handleCorrect} style={[styles.buttonStyle, { backgroundColor: "green" }]}>
                    <Text style={{ color: 'white' }}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIncorrect} style={[styles.buttonStyle, { backgroundColor: "red" }]}>
                    <Text style={{ color: 'white' }}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 35,
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
*/