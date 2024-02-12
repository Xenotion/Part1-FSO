const Persons = ({ filterdPersons, onDelete }) => {
    return (
        <>
            {filterdPersons.map((person) => (
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => onDelete(person.id)}>Delete</button>
                </p>
            ))}
        </>
    )
}

export default Persons