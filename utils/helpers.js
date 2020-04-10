import { Notifications } from 'expo'
import * as Permissions from "expo-permissions";
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'MobileFlashcard::notifications'

export function timeToString(time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}

export const DATA = {
    React: {
        title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                },
                {
                    question: 'What are some commonly used hooks?',
                    answer: 'useState and useEffects'
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

export function getDailyReminderValue() {
    return {
        today: "👋 Don't forget to log your data today!"
    };
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createLocalNotification() {
    return {
        title: 'Complete your quiz',
        body: "Don't forget to complete at least one quiz for today!",
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
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(14)
                            tomorrow.setMinutes(16)
                        
                            Notifications.scheduleLocalNotificationAsync(
                                createLocalNotification(),
                                {
                                    time: tomorrow,

                                    // Repeat notification is deprecated in iOS TODO rescheule every day
                                    //repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}
