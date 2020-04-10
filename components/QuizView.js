import React, { useState, useContext } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Button, Text, ShadowPropTypesIOS } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DeckListView from './DeckListView'
import { DecksContext } from '../context/DecksContext';
import { styles } from './styles'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

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
            clearLocalNotification()
                .then(setLocalNotification)            
            navigation.navigate('DeckListView')
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{fontSize:18}}>{currentCard}/{totalQuestions}</Text>
            {isAnswer === false
            ?   <LinearGradient colors={['#ff9a9e', '#fad0c4', '#fad0c4']} style={[styles.item, {flex: 2}]}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.content}>{deck.questions[currentCard].question}</Text>
                    <Button title="Show Answer" onPress={handleShowAnswer}></Button>
                </LinearGradient>
                : <LinearGradient colors={['#ff9a9e', '#fad0c4', '#fad0c4']} style={[styles.item, { flex: 2 }]}>
                    <Text style={styles.content}>{deck.questions[currentCard].answer}</Text>
                    <Button title="Show Question" onPress={handleShowQuestion}></Button>
                </LinearGradient>
            }
            <View style={styles.container}>
                <TouchableOpacity onPress={handleCorrect} style={[styles.button, { backgroundColor: "green" }]}>
                    <Text style={{ color: 'white' }}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIncorrect} style={[styles.button, { backgroundColor: "red" }]}>
                    <Text style={{ color: 'white' }}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
