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
    const { decks } = useContext(DecksContext)
    const { deckId } = route.params
    const deck = decks[deckId]

    const navigation = useNavigation();
    const [currentCard, setCurrentCard] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [isAnswer, showAnswer] = useState(false)
    const [isQuizFinished, setQuizFinished] = useState(false)

    const totalQuestions = deck.questions.length

    const handleRestartQuiz = () => {
        setCurrentCard(0)
        setCorrectCount(0)
        setQuizFinished(false)
    }

    const showScore = () => {
        console.log("In showScore:", currentCard, correctCount)
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#ff9a9e', '#fad0c4', '#fad0c4']} style={[styles.item, { flex: 2 }]}>
                    <Text style={[styles.item, { fontSize: 28 }]}>{`Score: ${correctCount}/${totalQuestions}`}</Text>
                    <Text style={[styles.item, { fontSize: 28 }]}>{`${Math.round(correctCount / totalQuestions * 100)}%`}</Text>
                </LinearGradient>

                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => handleRestartQuiz() }
                        style={[styles.button, { backgroundColor: "blue" }]}
                    >
                        <Text style={{ color: "white" }}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "none" }]}

                        onPress={() => navigation.pop()}
                    >
                        <Text style={{ color: "blue" }}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const handleCorrect = (isCorrect) => {
        console.log("handleCorrect", isCorrect)
        console.log("currentCard:", currentCard)
        console.log("totalQuestions:", totalQuestions)
        if (isCorrect === true)
            setCorrectCount(correctCount+1)
        if (currentCard < totalQuestions-1) {
            setCurrentCard(currentCard + 1)
            showAnswer(false)
        }
        else {
            console.log("Finished: current")
            setQuizFinished(true)
            clearLocalNotification()
                .then(setLocalNotification)
        }
    }

    if (isQuizFinished === true) return showScore()

    else return (
        <View style={styles.container}>  
            <Text style={{fontSize:18}}>{currentCard}/{totalQuestions}</Text>
            {isAnswer === false
            ?   <LinearGradient colors={['#ff9a9e', '#fad0c4', '#fad0c4']} style={[styles.item, {flex: 2}]}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.content}>{deck.questions[currentCard].question}</Text>
                    <Button title="Show Answer" onPress={() => showAnswer(true)}></Button>
                </LinearGradient>
                : <LinearGradient colors={['#ff9a9e', '#fad0c4', '#fad0c4']} style={[styles.item, { flex: 2 }]}>
                    <Text style={styles.content}>{deck.questions[currentCard].answer}</Text>
                    <Button title="Show Question" onPress={() => showAnswer(false)}></Button>
                </LinearGradient>
            }
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleCorrect(true)} style={[styles.button, { backgroundColor: "green" }]}>
                    <Text style={{ color: 'white' }}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCorrect(false)} style={[styles.button, { backgroundColor: "red" }]}>
                    <Text style={{ color: 'white' }}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
