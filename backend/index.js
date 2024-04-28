const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', function (req, res) {
	if (req.method === 'POST')
		return JSON.stringify(req.body)
	return (' ')
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

app.get('/info', (req, res, next) => {
	result = `Phonebook has info for ${persons.length} people <br/><br/> ${Date()}`
	res.send(result)
})

app.get('/api/persons', (req, res, next) => {
	Person.find({}).then(people => res.json(people))
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.json(person)
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	const person = {
		name: req.body.name,
		number: req.body.number
	}
	Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
		.then(result => {
			res.json(result)
		})
		.catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
	const person = new Person({
		name: req.body.name,
		number: req.body.number
	})
	person.save()
		.then((result) =>
			res.json(result)
		)
		.catch(error => next(error))
})



const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}
	if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}
}

app.use(errorHandler)