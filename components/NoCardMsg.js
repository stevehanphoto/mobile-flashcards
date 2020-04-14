import React from 'react'
import { View, Text } from 'react-native';
import { styles } from './styles'

export default function NoCardMsg() {
   return (
      <View style={styles.content}>
         <Text style={styles.cardText}>
            Sorry, you cannot take a quiz because there are no cards in the deck
         </Text>
      </View>
   )
}
/*
const styles = StyleSheet.create({
   center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      padding: 30,
   },
   text: {
      textAlign: 'center',
      fontSize: 24
   }
})*/