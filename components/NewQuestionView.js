import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DecksContext } from '../context/DecksContext'
import { styles } from './styles'

export default function NewQuestionView({ route }) {
    const { addCard } = useContext(DecksContext)
    const [question, onChangeQuestion] = useState('')
    const [answer, onChangeAnswer] = useState('')
    const { deckId } = route.params
    const navigation = useNavigation();

    const submitNewQuestion = () => {
        newQuestion = {
            question,
            answer
        }
        addCard(deckId, newQuestion)
        navigation.navigate('DeckView', { deckId })
    }

    return (
      <View style={styles.container}>
        <Text>Question</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangeQuestion(text)}
          value={question}
        />

        <Text>Answer</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangeAnswer(text)}
          value={answer}
        />

        <TouchableOpacity
          onPress={submitNewQuestion}
          style={[styles.button, { backgroundColor: "blue" }]}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
}
