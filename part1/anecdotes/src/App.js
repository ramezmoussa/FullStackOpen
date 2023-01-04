import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(7).fill(0))

  const [maxVotes, setMaxVotes] = useState(0)



  const getMaxIdx = (arr) => {

    let currentMaxIdx = 0
    for (let i = 1; i < 7; i++)
    {
      if(arr[i] > arr[currentMaxIdx])
      {
        currentMaxIdx = i
      }
    }
    return currentMaxIdx;
}
  
  const setRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * 7))
  }

  const updateVotes = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy)
    setMaxVotes(getMaxIdx(copy))

  }


  return (
    <div>
      <DayAnecdote anecdotes={anecdotes} selected={selected} votes={votes}></DayAnecdote>
      <Button handleClick={updateVotes} text="vote" />
      <Button handleClick={setRandomAnecdote} text="next anecdote" />
      <TopAnecdote anecdotes={anecdotes} maxVotes={maxVotes} votes={votes}></TopAnecdote>

    </div>
  )
}


const DayAnecdote = (props) => {
  return (
    <>
    <Header title="Anecdote of the day"></Header>
      {props.anecdotes[props.selected]}
      <br></br>
      has votes: {props.votes[props.selected]}
      <br></br>
    </>
  )
}

const TopAnecdote = (props) => {



  return (
    <>
    <Header title="Anecdote with most votes"></Header>
      {props.anecdotes[props.maxVotes]}
      <br></br>
      has votes: {props.votes[props.maxVotes]}
      <br></br>
    </>
  )
}



const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

export default App