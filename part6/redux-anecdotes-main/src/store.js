import { configureStore } from '@reduxjs/toolkit'

import anecodeReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecodeReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
  })

console.log(store.getState())


export default store
