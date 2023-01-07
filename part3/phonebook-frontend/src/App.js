import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'



const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameFilter, setNameFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMesssage] = useState(null)

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter))


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
    personService
      .getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      })
  }, [])



  const hanldeNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const deletePerson = (e) => {

    console.log(persons)
    console.log(e.target)
    if (window.confirm((`Delete ${e.target.getAttribute("name")}?`))) {


      let failed = false
      personService
        .deleteRecord(e.target.getAttribute("id"))
        .catch(error => {
          console.log('fail')
          failed = true
        })
        .then(response => {
          personService
            .getAll()
            .then(response => {
              setPersons(response)
              if (failed)
                displayError(`Information of ID: '${e.target.getAttribute("id")}' has already been removed from the server`)

            })
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const personsContainsName = (personObject) => {
      let i;
      for (i = 0; i < persons.length; i++) {
        if (personObject.name === persons[i].name) {
          return [true, persons[i]]
        }
      }

      return [false, null]
    }

    let [found, obj] = personsContainsName(personObject);
    console.log(found, obj)
    if (found) {

      const changedPerson = { ...personObject, id: obj.id }
      let failed = false
      console.log(changedPerson)
      if (window.confirm((`${changedPerson.name} is already added to phonebook, replace the old number with a new one?`))) {
        personService
          .update(changedPerson.id, changedPerson)
          .catch(error => {
            console.log(error)
            failed = true
          })
          .then(response => {
            personService
              .getAll()
              .then(response => {
                setPersons(response)
                if (failed)
                  displayError(`Information of '${changedPerson.name}' has already been removed from the server`)
                else
                  displayNotification(`Updated number of '${changedPerson.name}'`)
              })
          })
      }

      return
    }

    personService
      .create(personObject)
      .then(() => {
        personService.getAll()
          .then(response => {
            console.log(response)
            setPersons(response)
            setNewName('')
            setNewNumber('')
            displayNotification(`Added '${personObject.name}'`)
          })
      })
      .catch(error => {
        console.log(error)
        personService.getAll()
          .then(response => {
            setPersons(response)
            setNewName('')
            setNewNumber('')
            displayError(error.request.responseText)
          })
      })

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}></Notification>
      <Error message={errorMessage}></Error>

      <Filter hanldeNameFilterChange={hanldeNameFilterChange} nameFilter={nameFilter}></Filter>
      <br />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName}
        handleNameChange={handleNameChange} newNumber={newNumber}
        handleNumberChange={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson}></Persons>
    </div>
  )
}


const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNameChange} />
          <br />
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

    </>
  )
}


const Filter = (props) => {
  return (
    <>
      filter shown with: <input
        value={props.nameFilter}
        onChange={props.hanldeNameFilterChange} />
    </>
  )
}


const Persons = (props) => {
  return (
    <>
      {props.personsToShow.map(p =>
        <Person key={p.name} person={p} deletePerson={props.deletePerson} ></Person>
      )
      }
    </>
  )
}

const Person = (props) => {
  return (
    <>
      <p>{props.person.name} {props.person.number} <Button handleClick={props.deletePerson} person={props.person} text="delete" /> </p>



    </>
  )
}


const Button = (props) => (
  <button onClick={props.handleClick} id={props.person.id} name={props.person.name}>
    {props.text}
  </button>
)


export default App


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