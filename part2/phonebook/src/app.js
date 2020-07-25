import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import NamesnNum from "./components/NamesnNum";
import NumSection from "./components/NumSection";
import Service from "./services/services.js";
import Notification from "./components/Notification";
import "./index.css";
const App = () => {
  //fetch persons initial data from db.json
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState({});

    
    
       useEffect(()=>{
         Service.getAll()
    .then((data) => setPersons(data))
    .catch((err) => {
      setError({
        msg: "Could not get data. Please check your internet connection",
        type: "red",
      });
      setTimeout(() => {
        setError(null);
      }, 5000);
    });
        
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

      //ADD PERSON DETAILS TO SERVER
      Service.addPerson(newPersons)
        .then((renote) => {
          setPersons(persons.concat(renote));
          setError({
            msg: `${renote.name} has been added to the server`,
            type: "green",
          });
          setTimeout(() => {
            setError(null);
          }, 5000);
        })
        .catch((err) => {
          setError({
            msg: JSON.parse(err.response.request.response).error.message,
            type: "red",
          });
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
      //adding person to server done

      setNewNumber("");
      setNewName("");
    } else {
      const result = window.confirm(
        `${newName} already exists. Do you want to update it?`
      );
      if (result) {
        const element = persons.find((el) => el.name == newName);
        Service.updatePerson({
          ...element,
          number: newNumber,
        })
          .then((data) => {
            setPersons(persons.map((el) => (el.id == data.id ? data : el)));
          })
          .catch((err) => {
            setError({
              msg: JSON.parse(err.response.request.response).error.message,
              type: "red",
            });
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
        setNewName("");
        setNewNumber("");
      }
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (event) => {
    let id = event.target.id;
    let result = window.confirm(
      `Delete ${persons.find((el) => el.id == event.target.id).name}?`
    );

    if (result) {
      Service.deletePerson(event.target.id)
        .then((response) => {
          const newPersons = persons.filter((el) => el.id != id);
          setPersons(newPersons);
          setError({
            msg: `${
              persons.find((el) => el.id == id).name
            } has been removed from the server`,
            type: "green",
          });
          setTimeout(() => {
            setError(null);
          }, 5000);

          //Service.getAll().then(data=>setPersons(data))
        })
        .catch((err) => {
          console.log(err);
          setError({
            msg: `Person ${
              persons.find((el) => el.id == id).name
            } has already been removed from the server`,
            type: "red",
          });
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
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
          objarr.push({
            name: el.name,
            number: el.number,
          });
        }
        setFiltered(objarr);
      });
    } else {
      setFiltered([]);
    }
  };

  return (
    <div>
      <Notification props={error} /> <h2> Phonebook </h2>{" "}
      <div>
        filter shown with <input onChange={handleFiltering} />{" "}
      </div>
      <ul>
        {" "}
        {filtered.map((el) => (
          <NamesnNum
            key={el.name}
            name={el.name}
            number={el.number}
            del={false}
          />
        ))}{" "}
      </ul>{" "}
      <Form
        onsubmit={handleSubmit}
        newname={newName}
        newnumber={newNumber}
        handlename={handleNameChange}
        handlenumber={handleNumberChange}
      />{" "}
      <NumSection
        arr={persons}
        heading={"Numbers"}
        deletePerson={deletePerson}
        del={true}
      />{" "}
    </div>
  );
};

export default App;
