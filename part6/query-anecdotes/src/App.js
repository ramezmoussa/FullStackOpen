import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient } from 'react-query'


const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })


  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
    console.log('vote')
  }

  

  const result = useQuery(
    'anecdotes', getAnecdotes, 
    {
      retry: false
    }
  )

  if (result.isSuccess === false)
    return (
      <div>
          anecdote service not available due to problems in server
      </div>
    )
  console.log(result)
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }


  
  let anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
