const mongoose = require('mongoose')

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

const morgan = require('morgan')

// This was used for exercises 3.7
// app.use(morgan('tiny'))

morgan.token('res-body', (req, res) => {
    return JSON.stringify(req.body);
  });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'  ))

app.use(cors())
app.use(express.static('build'))


const url = `mongodb+srv://ramez:${password}@cluster0.vfhikws.mongodb.net/?retryWrites=true&w=majority`
  
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
    const currentDate = new Date();
    const dateString = currentDate.toString();

    response.set('Content-Type', 'text/html');
    response.send(Buffer.from(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${dateString} </p>
        `
        ));
    
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person)
        response.json(person)
    else
    {
        response.status(404).send({ error: `No person exists with id: ${id}`})

    }
  })


  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const removeIndex = persons.findIndex( person => person.id === id );
    if(removeIndex !== -1)
    {
        persons.splice( removeIndex, 1 );
        response.status(204).end()

    }
    else
    {
        response.status(404).send({ error: `No person exists with id: ${id}`})

    }
  })


  app.post('/api/persons', (request, response) => {
    const person = {...request.body}
    person.id = Math.floor((Math.random() *200))

    if(!('name' in person))
    {
        response.status(422).send({ error: `The name field is not present in the data provided`})
        return
    }

    if(!('number' in person))
    {
        response.status(422).send({ error: `The number field is not present in the data provided`})
        return
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
  
      let [found, obj] = personsContainsName(person);
      if (found) {
        response.status(422).send({ error: `A person with the same name already exist in the phonebook`})
        return
      }


    persons = persons.concat(person)
    response.status(200).end()
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})