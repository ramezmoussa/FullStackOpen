
import { useState } from 'react'

const Recommend = (props) => {

  const favoriteGenre = localStorage.getItem('current-user-genre')
  // Console log content of user:
  console.log("Recommend user Genre: ", favoriteGenre)

  const [genre, setGenre] = useState('all genres')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }


  const allBooks = props.result.data.allBooks

  let books = favoriteGenre ? allBooks.filter(book => book.genres.includes(favoriteGenre)) : allBooks  
  

  const allGenres = new Set(allBooks.map(book => book.genres).flat())

  console.log(allGenres)

  return (
    <div>
      <h2>recommendations</h2>
      
      books in your favourite genre: <b>{favoriteGenre}</b>
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
    </div>
  )
}

export default Recommend
