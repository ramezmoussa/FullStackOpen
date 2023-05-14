import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

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
  }
}
`
const App = () => {
  const [page, setPage] = useState('authors')

  const allAuthorsResult = useQuery(ALL_AUTHORS)
  const allBooksResult = useQuery(ALL_BOOKS)


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} result={allAuthorsResult} />

      <Books show={page === 'books'} result={allBooksResult} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
