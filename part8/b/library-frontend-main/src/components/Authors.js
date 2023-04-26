

import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`


const EDIT_AUTHOR = gql`
mutation updateAuthor($author: String!, $integerBornYear: Int!) {
  editAuthor(
    name: $author,
    setBornTo: $integerBornYear,
  ) {
    name
    born
    bookCount
  }
}
`



const Authors = (props) => {
  const [author, setAuthor] = useState(""); // State to track the selected element
  const [born, setBorn] = useState('')
 
  const [ updateAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  
  function handleSelection(event) {
    setAuthor(event.target.value); // Update the selected element state when user chooses an option
  }

  const submit = async (event) => {
    event.preventDefault()
  
    console.log(author, born)
    const integerBornYear = parseInt(born)
    updateAuthor({  variables: { author, integerBornYear } })


    console.log('update author...')

    setAuthor('')
    setBorn('')
  }



  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors
  console.log(authors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <form onSubmit={submit}>
      <h2>Set birthyear</h2>
      <select value={author} onChange={handleSelection}>
        <option value="">Select an option</option> {/* Default empty option */}
        {authors.map((element, index) => (
          <option key={index} value={element.name}>
            {element.name}
          </option>
        ))}
      </select>
      <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>

      </form>
    </div>
  )
}

export default Authors
