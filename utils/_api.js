//import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
//import * as SecureStore from "expo-secure-store"

const FLASHCARD_STORAGE_KEY = 'mobileFlashCard:deck'

export const createQuestion = ({ questionItem, deckId }) => {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deckId]: questionItem}))
}

// Ref from Udacity.  Todo - find better way
export const deleteDeck = (deckId) => {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[DeckId] = undefined
            delete data[DeckId]
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
        })
}