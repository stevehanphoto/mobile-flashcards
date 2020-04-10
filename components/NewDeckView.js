import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
//import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DecksContext } from '../context/DecksContext'
import DeckView from './DeckView'

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
            <Text>What is the title of your Deck?</Text>
            <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <TouchableOpacity 
                style={[styles.buttonStyle, { backgroundColor: "blue" }]}
                onPress={handleAddDeck}
            >
                <Text style={{ color: 'white' }}>Create Deck</Text>
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
