import React, { useState, useEffect } from "react";
import Countries from './Components/Countries.js';

import axios from "axios";


const App = () => {
  const [newName, setNewName] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const buttonClick = (event) => {
           setNewName(event.target.id);
      
   
  };
  const setnewname = (event) => {
    setNewName(event.target.value);
  }; 
   

  return (
    <div>
      <div>
        <h4>
          find countries <input onChange={setnewname} value={newName} />
        </h4>
      </div>
      <div>
      <Countries
        name={newName}
        data={data}
        onclick={buttonClick}
      /></div>
    </div>
  );
};

export default App;
