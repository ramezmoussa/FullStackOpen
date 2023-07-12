import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'



const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice( {
  name: 'anecdotes',
  initialState: [],
  reducers: {
      vote(state, action) {
        state = state.map((data) => {
          console.log(action.payload.id, data.id, data.votes)
          if (data.id === action.payload.id) {
            return { ...data, votes: data.votes + 1 };
          }
          return data;
        });
        state.sort((a, b) => b.votes - a.votes);
        return state
      },
      newAnecdote(state = [], action) {
        console.log([...state, action.payload])
        state = [...state, action.payload];
        state.sort((a, b) => b.votes - a.votes);
        return state
      },
      setAnecdotes(state, action) {
        console.log("setAnecdotes", action)
        return action.payload
      }

  }

})


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
      let obj = {content: anecdote, id: getId(), votes: 0}
      await anecdoteService.createNew(obj)
      dispatch(newAnecdote(obj))
  }
}

export const voteAnecdoteWrapper = obj => {
  return async dispatch => {
      await anecdoteService.update(obj)
      dispatch(vote(obj))
  }
}
export const { vote, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
