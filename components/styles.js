import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 20,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    //      backgroundColor: 'lightgrey',
    borderColor: "lightgrey",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  content: {
    fontSize: 16,
    color: "darkgrey",
  },
  title: {
    fontSize: 32,
    color: "black",
  },
  h3: {
    fontSize: 20,
    paddingLeft: 10,
    //      textAlign: 'center'
  },
  textInput: {
    padding: 10,
    height: 40,
    borderColor: "gray",
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 10,
  },
  button: {
    color: "white",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 35,
    alignItems: "center",
  },
});

export { styles }

