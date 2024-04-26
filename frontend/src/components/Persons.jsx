import PersonDetails from "./PersonDetails";

const Persons = ({ persons, search, handleDelete }) => {
	return (
		persons
			.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))
			.map(person => <PersonDetails handleDelete={handleDelete} key={person.name} person={person}></PersonDetails>)
	);
}

export default Persons;