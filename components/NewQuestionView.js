import React, { useState, useContext } from 'react'
//import { View, Text, StyleSheet, TextInput } from 'react-native'
import {
  KeyboardAvoidingView, View, Text, SafeAreaView, StyleSheet,
  TextInput, Keyboard, TouchableWithoutFeedback, Platform
} from 'react-native'
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
        if (question === '') {
          alert ('Please enter a question')
          return
        }
        if (answer === '') {
          alert('Please enter an answer')
          return
        }
        newQuestion = {
            question,
            answer
        }
        addCard(deckId, newQuestion)
        navigation.navigate('DeckView', { deckId })
    }

    return (
      <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : null} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
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
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={submitNewQuestion}
                  style={[styles.button, { backgroundColor: "blue" }]}
                >
                  <Text style={{ color: "white" }}>Submit</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }} />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
}
