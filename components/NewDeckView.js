import React, {useState, useContext} from 'react'
import { 
    KeyboardAvoidingView, View, Text, SafeAreaView, 
    TextInput, Keyboard, TouchableWithoutFeedback, Platform 
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DecksContext } from '../context/DecksContext'
import DeckView from './DeckView'
import { styles } from './styles'

export default function NewDeckView({ navigation }) {
    const [deckId, setDeckId] = useState('')
    const { addDeck } = useContext(DecksContext)

    const handleAddDeck = () => {
        if (deckId === '') {
            alert('Please enter the title of your deck')
            return
        }
        addDeck(deckId)
        navigation.navigate('DeckView', { deckId })
        setDeckId('')
    }

    return (
        <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : null} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.h3}>What is the title of your Deck?</Text>
                        <TextInput
                            style={styles.textInput}
                            maxLength={20}
                            onChangeText={text => setDeckId(text)}
                            value={deckId}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: "blue" }]}
                                onPress={handleAddDeck}
                            >
                                <Text style={{ color: 'white' }}>Create Deck</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

