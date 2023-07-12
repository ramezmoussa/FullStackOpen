import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { resetNotification, setNotification } from '../reducers/notificationReducer'


export const AnecdoteList = () => {
    const dispatch = useDispatch()
    let anecdotes = useSelector(state => state.anecdotes)
    let filter_str = useSelector(state => state.filter)
    
    anecdotes = anecdotes.filter(anecdote => filter_str.length > 0 ? anecdote.content.includes(filter_str) : anecdote)



    const displayNotification = (message) => {
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(resetNotification(""))
      }, 5000)
  
    }

    const voteForAnecdote = (id) => {
        console.log(id);
        dispatch(vote({
            content: '',
            id: id,
            votes: 0
        }));

        let content = anecdotes.find(obj => obj.id === id).content
        displayNotification(`you voted '${content}'`)
        
      }

    return (
        <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteForAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>

    )
  }
  
  export default AnecdoteList