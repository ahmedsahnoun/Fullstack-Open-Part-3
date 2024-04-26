import { useEffect, useState } from 'react'
import personService from './services/personService'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newPerson.name)) {
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(persons.find(person => person.name === newPerson.name).id, newPerson)
          .then(response => {
            setPersons(persons.filter(person => person.name !== newPerson.name).concat(response))
            setMessage({ text: `Changed ${newPerson.name}'s number` })
            setTimeout(() => {
              setMessage({})
            }, 2000)
          })
      }
    }
    else {
      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response))
          setMessage({ text: `Added ${newPerson.name}` })
          setTimeout(() => {
            setMessage({})
          }, 2000)
        })
    }
  }

  const handleDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          setMessage({ text: `Deleted ${personToDelete.name}` })
          setTimeout(() => {
            setMessage({})
          }, 2000)
        })
        .catch(() => {
          setMessage({ text: `${personToDelete.name} was not found`, color: "red" })
          setTimeout(() => {
            setMessage({})
          }, 2000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message}></Notification>

      <Filter
        search={search}
        setSearch={setSearch}
      ></Filter>

      <h2>Add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      ></PersonForm>

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        search={search}
        handleDelete={handleDelete}
      ></Persons>

    </div>
  )
}

export default App