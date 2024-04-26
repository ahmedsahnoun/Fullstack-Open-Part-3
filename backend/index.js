const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
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

app.get('/info', (req, res) => {
	result = `Phonebook has info for ${persons.length} people <br/><br/> ${Date()}`
	res.send(result)
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	result = persons.find(person => person.id === id)
	if (result)
		res.json(result)
	else
		res.status(404).json({ error: 'content missing' })
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)
	res.status(204).end()
})

app.post('/api/persons', (req, res) => {
	const newId = Math.floor(Math.random() * 10000)
	const newPerson = { ...req.body, id: newId }
	if (!newPerson.number)
		return res.status(400).json({ error: 'missing number' })
	if (!newPerson.name)
		return res.status(400).json({ error: 'missing name' })
	if (persons.find(person => person.name === newPerson.name))
		return res.status(400).json({ error: 'name must be unique' })
	persons.push(newPerson)
	res.json(newPerson)
})