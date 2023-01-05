import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameFilter, setNameFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter))



  const hanldeNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const personsContainsName = (personObject) => {
      let i;
      for (i = 0; i < persons.length; i++) {
        if (personObject.name === persons[i].name) {
          return true;
        }
      }

      return false;
    }


    if (personsContainsName(nameObject)) {
      alert(`${nameObject.name} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
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

      <Persons personsToShow={personsToShow}></Persons>
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
        <Person key={p.name} person={p}></Person>
      )
      }
    </>
  )
}

const Person = (props) => {
  return (
    <>
        <p>{props.person.name} {props.person.number}</p>
      
    </>
  )
}

export default App