import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMesssage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)


  const blogFormRef = useRef()

  const displayNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

  }

  const displayError = (message) => {
    setErrorMesssage(message)
    setTimeout(() => {
      setErrorMesssage(null)
    }, 5000)

  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])



  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')

  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()

    console.log(blogFormRef)

    try {
      const response = await blogService.create(newBlog)
      console.log(response)
      displayNotification(`A new blog: ${response.title} by ${response.author}`)
      blogService.getAll()
        .then(blogs => {
          blogs.sort((a, b) => (b.likes - a.likes))
          setBlogs( blogs )
        })

    }
    catch (exception) {
      console.log(exception)
      displayError(exception.response.data.error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )


      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayError(exception.response.data.error)
    }
  }

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        blogs.sort((a, b) => (b.likes - a.likes))
        setBlogs( blogs )
      })
  }, [])


  const addLikeHandler = async (newBlog) => {
    newBlog.likes = newBlog.likes + 1
    newBlog.user = newBlog.user.id
    try {
      await blogService.update(newBlog)
      blogService.getAll()
        .then(blogs =>
        {
          blogs.sort((a, b) => (b.likes - a.likes))
          setBlogs( blogs )

        })

    }
    catch (exception) {
      console.log(exception)
    }

  }

  if (user === null) {
    return (
      <div>
        <Error message={errorMessage}></Error>

        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>



      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage}></Notification>
      <Error message={errorMessage}></Error>

      <p>{user.name} is logged in
        <Button handleClick={logout} text="logout" />
      </p>


      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog}></BlogForm>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} addLikeHandler={addLikeHandler} style="test-blog" />
      )}
    </div>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}


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



export default App
