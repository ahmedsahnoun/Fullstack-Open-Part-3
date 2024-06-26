const PersonDetails = ({ person, handleDelete }) => {
	return (
		<div>
			{person.name} {person.number}
			<button onClick={() => handleDelete(person)}>Delete</button>
		</div>
	);
}

export default PersonDetails;