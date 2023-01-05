import { useState, useEffect  } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])

  const [countryFilter, setCountryFilter] = useState('')

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))



  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter handleCountryFilterChange={handleCountryFilterChange} nameFilter={countryFilter}></Filter>
      <br />
      <Countries countriesToShow={countriesToShow}></Countries>
    </div>
  )
}



const Filter = (props) => {
  return (
    <>
      filter shown with: <input
        value={props.countryFilter}
        onChange={props.handleCountryFilterChange} />
    </>
  )
}


const Countries = (props) => {

  if (props.countriesToShow.length > 10)
  {
    return (
      <>
        
        <p>Too many matches, specify another filter</p>
      </>
    )
  }

  if (props.countriesToShow.length === 0)
  {
    return (
      <>
        
        <p>No countries exist in the list with these letters</p>
      </>
    )
  }

  return (
    <>
      
      {props.countriesToShow.map(c =>
        <Country key={c.tld} country={c} flag={props.countriesToShow.length === 1}></Country>
      )
      }
    </>
  )
}

const Country = (props) => {

  const [viewFilter, setViewFilter] = useState(false)


   const showClicked = () => {
    setViewFilter(true)
  }

   if((viewFilter || props.flag))
    return (
      <>
          <p>{props.country.name.common} </p>
          <p>capital {props.country.capital}</p>
          <p>area {props.country.area}</p>
          <p>languages: </p>
          <ul>
          {Object.entries(props.country.languages).map(l => <li key={l[0]}>{l[1]}</li>          
          )
          }
          </ul>


          <img alt={props.country.name.common} src={props.country.flags.png}></img>
          <br/>

      </>
    )
    
  return (
    <>
      
        {`${props.country.name.common} `}  
        <Button handleClick={showClicked} text="show" />
        <br/>

    </>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


export default App