import React, { useState,useEffect } from "react";
import Form from "./components/Form";
import NamesnNum from "./components/NamesnNum";
import NumSection from "./components/NumSection";
import axios from "axios";

const App = () => {
    //fetch persons initial data from db.json
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);
   useEffect(()=>{
        console.log("effect");
        axios
        .get("http://localhost:3001/persons")
        .then((data)=>{
            setPersons(data.data);
            console.log(data.data);
        }).catch(err=>console.log(err));
        
    },[])

  const exists = (name) => {
    let arr = persons.map((el) => el.name.toLowerCase() === name.toLowerCase());
    return arr.indexOf(true) + 1;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!exists(newName) && newName.length > 0) {
      const newPersons = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPersons));
      setNewNumber("");
      setNewName("");
    } else {
      alert(`${newName} already exists`);
      setNewName("");
      setNewNumber("");
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFiltering = (event) => {
    if (event.target.value.replace(" ", "").length > 0) {
      const name = event.target.value;
      let objarr = [];
      persons.map((el) => {
        if (el.name.toLowerCase().includes(name.toLowerCase())) {
          objarr.push({ name: el.name, number: el.number });
        }
        setFiltered(objarr);
      });
    } else {
      setFiltered([]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFiltering} />
      </div>

      <ul>
        {filtered.map((el) => (
          <NamesnNum key={el.name} name={el.name} number={el.number} />
        ))}
      </ul>
      <Form
        onsubmit={handleSubmit}
        newname={newName}
        newnumber={newNumber}
        handlename={handleNameChange}
        handlenumber={handleNumberChange}
      />
      <NumSection arr={persons} heading={"Numbers"} />
    </div>
  );
};

export default App;
