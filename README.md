# Mobile Flashcard Project

This project was built for the React Native section of the Udacity's React Nanodegree course.  The app allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.  This project encompasses the fundamental aspects of building a native application including handling infinite lists, routing, and user input.  This project is a mobile application developed using React Native for both Android and iOS.  

This project was tested on 2 mobile phones, an iphone X (iOS) and an Samsung Note 5 (Android) using Expo on Windows 10.

## Instructions to run:

Install the Expo Client App from Appstore for iPhone and Expo Project app from Goggle Playstore for Android phone.

Assuming [node.js](https://nodejs.org/en/) is already installed, install the Expo CLI with the command:

```
npm install -g expo-cli
```

To clone this repository, run the command:

```
git clone https://github.com/stevehanphoto/expo-mobileflashcard.git
```

cd in to expo-mobileflashcard project folder

run the commands:

```
npm install

expo start
```

Lastly the project can be loaded on to the phone and and runned using QR code.
On the iphone use the phone's camera, an option to open app with the Expo should pop up.
On the Android phone, open the Expo app go to Scan QR Code under Tools.

## Project Folder Structure
```
├── README.md # This file.
├── package.json # npm package manager file.
├── App.json # Expo configuration
└── src
    ├── components
    │   ├── DeckListView.js # Presents a listing of decks. Touching on a deck takes you to the Deck View for that deck
    │   ├── DeckView.js # View where you can take a quiz of the deck, add cards, or delete it.
    │   ├── NewQuestionView.js # Where you enter in a question and answer form.
    │   ├── NewDeckView.js # Where you enter in a title of the new deck
    │   ├── QuizView.js # Where you take a quiz.  You have the option of seeing the question or answer and marking whether you got it correctly or incorrectly. Once you finish the result is presented.
    │   └── NoCardMsg.js # This view is shown when there is no cards in the deck
    ├── context
    │   ├── DecksContext.js # Contains the action creators and allow components to dispatch actions to the reducer
    │   ├── reducer.js # Based on Redux reducers and implemented using the useReducers.  Returns the new state based on the dispatched action and payload.
    │   ├── middleware.js # Currently the only reducer middleware logs the actions and state changes
    │   └── actionType.js # Contains all the reducer action types
    ├── utils
    │   └── helper.js # Contains the starting decks object data and functions to handle notifications  
    └── App.js # Main app
```

## Resources
- [Project Rubric](https://review.udacity.com/#!/rubrics/1021/view)
