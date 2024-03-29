
import { useState } from 'react'

const Books = (props) => {

  const [genre, setGenre] = useState('all genres')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }


  const allBooks = props.result.data.allBooks

  let books = []
  if (genre === 'all genres') {
    books = allBooks
  }
  else {
    books = genre ? allBooks.filter(book => book.genres.includes(genre)) : allBooks  
  }

  const allGenres = new Set(allBooks.map(book => book.genres).flat())

  console.log(genre)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from(allGenres).map(genre => <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)}
        <button onClick={() => setGenre('all genres')}>all genres</button>
      </div>

    </div>
  )
}

export default Books
