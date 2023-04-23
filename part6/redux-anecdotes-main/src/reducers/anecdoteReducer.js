const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]






const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {

  if (action.payload === undefined)
    return state;

  let result;
  switch (action.type) {
    case 'VOTE':
      console.log(action.payload);
      let copy = state.map((data) => {
        if (data.id === action.payload.id) {
          return { ...data, votes: data.votes + 1 };
        }
        return data;
      });
      result = copy;
      break;
    case 'NEW_ANECDOTE':
      console.log([...state, action.payload])
      result = [...state, action.payload];
      break;
    default:
      result = state;
      break;
  }

  return result.sort((a, b) => b.votes - a.votes);

}


export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      votes: 0,
      id: getId()
    }
  }

}
export default reducer