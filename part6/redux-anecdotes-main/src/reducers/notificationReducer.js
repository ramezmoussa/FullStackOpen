import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice( {
  name: 'notification',
  initialState: '',
  reducers: {
      setNotification(state = '', action) {
        console.log("state ", state)
        console.log("action", action)
        state = action.payload;
        return state
      },
      resetNotification(state = '', action) {
        state = ''
        return state
      }

  }

})

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer
