import { AsyncStorage } from 'react-native'

// Credit: https://www.npmjs.com/package/react-hooks-logger
export const logger = (reducer) => {
  const reducerWithLogger = (state, action) => {
    console.group(action.type)
      console.log(
         "%cPrevious State:",
         "color: #9E9E9E; font-weight: 700;",
         state
      )
      console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action)
      console.log(
         "%cNext State:",
         "color: #47B04B; font-weight: 700;",
         reducer(state, action)
      )
    console.groupEnd()
    return reducer(state, action)
  }
  return reducerWithLogger
}
