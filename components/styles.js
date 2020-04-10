import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
   container: {
      flex: 1,
      margin: 10,
      padding: 20,
   }, 
   item: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgrey',
      borderColor: 'lightgrey',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      padding: 20,
      marginVertical: 16,
      marginHorizontal: 20,
      shadowColor: 'black',
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 10
   },
   title: {
      fontSize: 32,
      color: 'black',
   },

/*   item: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgrey',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
   },*/
   buttonStyle: {
      color: 'white',
      marginVertical: 10,
      marginHorizontal: 10,
      padding: 20,
      borderRadius: 35,
      alignItems: 'center'
   }
})

export { styles }

