import { useState, useEffect  } from 'react'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameFilter, setNameFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter))


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

    console.log(e.target)
    if(window.confirm((`Delete ${e.target.getAttribute("name")}?`)))
    {

    
    personService
      .deleteRecord(e.target.getAttribute("id"))
      .then(response => {
        personService
          .getAll()
          .then(response => {
            setPersons(response)
          })
      })
  }
}

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
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

    var [found, obj] = personsContainsName(personObject);
    console.log(found, obj)
    if (found) {

      const changedPerson = { ...personObject, id: obj.id}
      console.log(changedPerson)
      if(window.confirm((`${changedPerson.name} is already added to phonebook, replace the old number with a new one?`)))
      {
        personService
        .update(changedPerson.id, changedPerson)
        .then(response => {
          personService
            .getAll()
            .then(response => {
              console.log(response)
              setPersons(response)
            })
        })
        }

      return
    }

    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      })

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter hanldeNameFilterChange={hanldeNameFilterChange} nameFilter={nameFilter}></Filter>
      <br />

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