import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import { gql, useQuery, useSubscription} from '@apollo/client'
import './index.css'
import Recommend from './components/Recommend'



const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
      author {
        name
        bookCount
      }
      title
      genres
  }
`


export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`



const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}
`
const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`New book added: ${data.data.bookAdded.title}`)
    }
  })



  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  const [page, setPage] = useState('authors')

  const allAuthorsResult = useQuery(ALL_AUTHORS)
  const allBooksResult = useQuery(ALL_BOOKS)
  
  const displayErrorMessage = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)

  }


  console.log("current token: ", token)
  const logout = () => {
    setToken(null)
    localStorage.clear()
  }


  
  if (!token) {
    return (
      <div>
        <Error message={error}></Error>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
  
        <Authors show={page === 'authors'} result={allAuthorsResult} />
  
        <Books show={page === 'books'} result={allBooksResult} />
        
        <LoginForm show={page === 'login'} setToken={setToken} displayErrorMessage={displayErrorMessage} />

      </div>
    )
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} result={allAuthorsResult} />

      <Books show={page === 'books'} result={allBooksResult} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} result={allBooksResult} />
    </div>
  )
}

export default App
