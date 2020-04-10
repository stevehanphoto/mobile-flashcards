import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DecksContext } from '../context/DecksContext'

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
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeQuestion(text)}
                value={question}
            />

            <Text>Answer</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                onChangeText={text => onChangeAnswer(text)}
                value={answer}
            />

            <TouchableOpacity
                onPress={submitNewQuestion} 
                style={[styles.buttonStyle, { backgroundColor: "blue" }]}
            >
                <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>
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
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 35,
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
