import React, { useState, useContext } from 'react'
import { SafeAreaView, View, FlatList, Button, Text, ShadowPropTypesIOS } from 'react-native'
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
    navigation.setOptions({ headerBackTitle: 'Back', headerTitle: `Quiz: ${deckId}` })

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
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#ff9a9e', '#fad0c4', '#fad0c4']} style={styles.item}>
                    <Text style={styles.title}>{`Score: ${correctCount}/${totalQuestions}`}</Text>
                    <Text style={[styles.cardText, {marginTop: 20}]}>{`${Math.round(correctCount / totalQuestions * 100)}%`}</Text>
                </LinearGradient>

                <View style={styles.buttonContainer}>
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
        if (isCorrect === true)
            setCorrectCount(correctCount+1)
        if (currentCard < totalQuestions-1) {
            setCurrentCard(currentCard + 1)
            showAnswer(false)
        }
        else {
            setQuizFinished(true)
            clearLocalNotification()
                .then(setLocalNotification())
        }
    }

    if (isQuizFinished === true) return showScore()

    else return (
        <View style={styles.container}>  
            <Text style={{fontSize:18}}>Question {currentCard+1} of {totalQuestions}</Text>
            {isAnswer === false
            ?   <LinearGradient colors={['#ff9a9e', '#fad0c4', '#fad0c4']} style={styles.item}>
                    <View style={styles.content}>
                        <Text style={styles.cardText}>{deck.questions[currentCard].question}</Text>
                        <TouchableOpacity onPress={() => showAnswer(true)}>
                            <Text style={styles.cardButton}>Show Answer</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                : <LinearGradient colors={['#ff9a9e', '#fad0c4', '#fad0c4']} style={styles.item}>
                    <View style={styles.content}>
                        <Text style={styles.cardText}>{deck.questions[currentCard].answer}</Text>
                        <TouchableOpacity onPress={() => showAnswer(false)}>
                            <Text style={styles.cardButton}>Show Question</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            }
            <View style={styles.buttonContainer}>
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
