import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    // set found to false if not found
      axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => {
        console.log(response)
        setCountry({...response.data, found: true})
      })
      .catch( error => {
      console.log(error)
      setCountry({found: false})})
  } , [name])

  return country
}

const Country = ({ country }) => {
  console.log("country: ", country)
  if (!country) {
    return null
  }

  // if country.found is false, return not found

  if (!country.found || country.found === false ) {
    return (
      <div>
        not found...
      </div>
    )
  }

  console.log("country: ", country[0].flags.png)
  return (
    <div>
      <h3>{country[0].name.common} </h3>
      <div>capital {country[0].capital} </div>
      <div>population {country[0].population}</div> 
      <img src={country[0].flags.png} height='100' alt={`flag of ${country[0].name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App