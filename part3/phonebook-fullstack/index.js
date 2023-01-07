const mongoose = require('mongoose')

const Buffer = require('buffer').Buffer

const Person = require('./models/person')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

const morgan = require('morgan')

// This was used for exercises 3.7
// app.use(morgan('tiny'))

morgan.token('res-body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'))

app.use(cors())
app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        response.status(400).send(error.message)
        return
    }

    else if (error.name === 'IdDoesNotExist') {
        response.status(404).send(error.message)
        return
    }

    else if (error.name === 'nameNotPresent') {
        response.status(409).send(error.message)
        return

    }

    else if (error.name === 'numberNotPresent') {
        response.status(409).send(error.message)
        return
    }
    else if(error.name === 'ValidationError')
    {
        response.status(400).send(error.message)
        return
    }
    next(error)
}

app.get('/api/persons', (request, response) => {

    Person.find({}).then(result => {
        let res = []
        result.forEach(person => {
            res = res.concat(person)
        })
        return response.json(res)
    })
        .catch((err) => console.log(err))
})

app.get('/api/info', (request, response) => {
    const currentDate = new Date()
    const dateString = currentDate.toString()

    response.set('Content-Type', 'text/html')

    Person.find({}).then(result => {
        let res = []
        result.forEach(person => {
            res = res.concat(person)
        })
        response.send(Buffer.from(
            `<p>Phonebook has info for ${res.length} people</p>
        <p>${dateString} </p>
        `
        ))
    })
        .catch((err) => console.log(err))



})

app.get('/api/persons/:id', async (request, response, next) => {


    try {
        const id = mongoose.Types.ObjectId(request.params.id)

        await Person.findOne({ _id: id }).exec()
            .then((result) => {

                if (!result) {
                    throw Error
                }
                response.json(result)
                return response.status(204).end()

            })
    }
    catch (error) {
        const err = new Error()
        err.name = 'IdDoesNotExist'
        err.message = `No person exists with id: ${request.params.id}`
        console.log(err.name)
        next(err, request, response)
        return
    }

})


app.put('/api/persons/:id', async (request, response, next) => {
    const id = mongoose.Types.ObjectId(request.params.id)
    const updates = {
        'name': request.body.name,
        'number': request.body.number
    }

    console.log(id, updates)

    try {
        const result = await Person.findOneAndUpdate({ _id: id }, updates, { returnDocument: 'before', runValidators: true })

        console.log('here', result)
        if (!result) {
            const error = new Error()
            error.name = 'IdDoesNotExist'
            error.message = `No person exists with id: ${id}`
            throw error
        }
    }
    catch (error) {
        next(error, request, response)
        return
    }
    return response.status(204).end()

})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndDelete(mongoose.Types.ObjectId(id))
        .catch(error => next(error))

    return response.status(204).end()

})


app.post('/api/persons', async (request, response, next) => {
    const person = { ...request.body }

    try {
        if (person.name.length === 0) {
            const error = new Error()
            error.name = 'nameNotPresent'
            error.message = 'The name field must be filled'
            throw error
        }

        if (person.number.length === 0) {
            const error = new Error()
            error.name = 'numberNotPresent'
            error.message = 'The number field must be filled'
            throw error
        }


        const p = new Person({
            name: person.name,
            number: person.number
        })

        let saving = await p.save()

        response.json(saving)
    

    }
    catch (err) {
        next(err)
    }


    return response.status(200).end()


})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



app.use(errorHandler)
