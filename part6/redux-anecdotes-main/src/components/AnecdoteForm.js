import { createAnecdote, newAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from 'react-redux'

export const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(createAnecdote(content)));
      }

    return (
        <div>

        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name="anecdote" /> </div>
          <button type="submit">create</button>
        </form>
        </div>

    )
  }
  
  export default AnecdoteForm