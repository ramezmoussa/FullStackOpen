import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)


export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)


  
export const updateAnecdote = object => {
    object = {...object, votes: object.votes + 1}
    axios.put(`${baseUrl}/${object.id}`, object)
}