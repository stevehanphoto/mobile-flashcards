import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
//import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DecksContext } from '../context/DecksContext'
import DeckView from './DeckView'
import { styles } from './styles'

export default function NewDeckView({ navigation }) {
    const [title, setTitle] = useState('')
    const { addDeck } = useContext(DecksContext)
//    const navigation = useNavigation()

    const handleAddDeck = () => {
        let deckId = title.replace(/\s/g, "")
        addDeck(deckId, title)
//        setTitle('')
        navigation.navigate('DeckView', { deckId })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.h3}>What is the title of your Deck?</Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: "blue" }]}
                onPress={handleAddDeck}
            >
                <Text style={{ color: 'white' }}>Create Deck</Text>
            </TouchableOpacity>
        </View>
    )
}

