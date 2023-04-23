import { useSelector, useDispatch } from 'react-redux'



export const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    const vote = (id) => {
        console.log(id);
        dispatch({
          type: 'VOTE',
          payload: {
            content: '',
            id: id,
            votes: 0
          }
        });
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>

    )
  }
  
  export default AnecdoteList