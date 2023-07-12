import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice( {
  name: 'notification',
  initialState: '',
  reducers: {
      setNotificationState(state = '', action) {
        console.log("state ", state)
        console.log("action", action)
        state = action.payload;
        return state
      },
  }
})


export const setNotification = (notifMessage, time) => {
    return async dispatch => {
        await dispatch(setNotificationState(notifMessage))
        setTimeout(() => {
            dispatch(setNotificationState(''))
        }, time*1000)
    }
}

export const { setNotificationState } = notificationSlice.actions
export default notificationSlice.reducer
