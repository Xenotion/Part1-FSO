import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import { getAll, create, deleteItem, updatePerson } from "./services/api"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAll()
    .then(initialPersons => {
      setPersons(initialPersons);
    })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find(p => p.name === newName);
    const personExists = persons.some((person) => person.name === newName);

    if (!personExists) {
      create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons((prev) => [...prev, response]);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      updatedPerson(person.id, newName, newNumber)
    }
  };

  const deletePerson = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this person?");
    if (isConfirmed) {
      deleteItem(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch((error) => {
          alert(error);
        })
    }
  }

  const updatedPerson = (personId, newName, newNumber) => {
    const isConfirmed = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
    if (isConfirmed) {
      const updatedPerson = { name: newName, number: newNumber };
      updatePerson(personId, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personId ? person : returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          alert('An error occurred while updating the person');
          console.error(error);
        });
    }
  };
  

  const filteredPersons = persons.filter((person) =>
  person.name && person.name.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons filterdPersons={filteredPersons} onDelete={deletePerson}/>
    </div>
  );
};

export default App;
