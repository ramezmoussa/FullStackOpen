
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice( {
    name: 'filter',
    initialState: '',
    reducers: {
        filterReducer(state = '', action) {
            console.log("inside filterreducer", state, action)
            return action.payload
            
        }
    }
})

export const filterChange = filter => {
    return {
    payload: filter
    }
}
export const { filterReducer } = filterSlice.actions
export default filterSlice.reducer

