import React, { createContext, useReducer } from 'react'
import Reducer from './reducer'
import {logger} from './middleware'
import { DATA } from '../utils/helpers'
import { ADD_CARD, ADD_DECK, DELETE_DECK } from './actionType'

const INITIAL_STATE = {
    decks: DATA
}

export const DecksContext = createContext(INITIAL_STATE)

export const DecksProvider = ({ children }) => {
//    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)    
    const [state, dispatch] = useReducer(logger(Reducer), INITIAL_STATE);

    function deleteDeck(deckId) {
        dispatch({
            type: DELETE_DECK,
//            payload: { deckId }
            payload: { [deckId]: { 'title': state.decks[deckId].title } }
        })
    }

    function addDeck(deckId, title) {
        dispatch({
            type: ADD_DECK,
            payload: { deckId, title }
        })
    }

    function addCard(deckId, newQuestion) {
        console.log("addCard dispatch", newQuestion)
        dispatch({
            type: ADD_CARD,
            payload: {
                deckId,
                newQuestion
            }
        })
    }

    return (<DecksContext.Provider value={{
        decks: state.decks,
        deleteDeck,
        addCard,
        addDeck
    }}>
        {children}
    </DecksContext.Provider>)
}
