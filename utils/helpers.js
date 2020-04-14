import { Vibration, Platform } from 'react-native';
import { Notifications } from 'expo'
import * as Permissions from "expo-permissions";
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'MobileFlashcard::notifications'

export const DATA = {
    React: {
        title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in a class component in React?',
                    answer: 'The componentDidMount lifecycle event'
                },
                {
                    question: 'What hooks are used in the creation of this app?',
                    answer: 'useState, useEffects, useReducer, useContext, and useNavigation'
                }

            ]
    },
    JavaScript: {
        title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createLocalNotification() {
    return {
        title: 'Complete your quiz',
        body: "Don't forget to complete your quiz for today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate()+1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createLocalNotification(),
                                {
                                    time: tomorrow,
                                    // Repeat notification is deprecated in iOS
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}
