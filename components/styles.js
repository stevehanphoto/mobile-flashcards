import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-end",
  },
  LinearGradient: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    flex: 1,
    fontSize: 16,
    color: "darkgrey",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  title: {
    fontSize: 32,
    color: "black",
  },
  cardText: {
    fontSize: 24,
    color: "black",
  },
  num: {
    alignSelf: 'center'
  },
  h3: {
    fontSize: 20,
    paddingLeft: 10,
  },
  textInput: {
    height: 50,
    padding: 15,
    paddingBottom: 15,
    fontSize: 16,
    borderColor: "gray",
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 0,
    paddingTop: 0,
  },
  button: {
    width: 250,
    color: "white",
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 30
  },
  cardButton: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'blue',
    fontSize: 16,
    marginTop: 10,
    lineHeight: 20,
  }
});

export { styles }

