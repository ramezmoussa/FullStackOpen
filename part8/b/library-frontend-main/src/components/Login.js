import { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'




const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      token {
        value
      }
      user {
        username
        favoriteGenre
      }
    }
  }
`



const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      props.displayErrorMessage(error.graphQLErrors[0].message)
    },
  })


  
  useEffect(() => {
    if ( result.data ) {

      const token = result.data.login.token.value
      props.setToken(token)
      localStorage.setItem('user-token', token)
      localStorage.setItem('current-user-genre', result.data.login.user.favoriteGenre)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  if (!props.show) {
    return null
  }

  
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm