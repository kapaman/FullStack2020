import React from "react";
import Weather from "./Weather"


const Expanded = ({ prop }) => {
  return (
    <div>
      <h1>{prop[0].name}</h1>
      <p>capital:{prop[0].capital}</p>
      <p>population:{prop[0].population}</p>
      <ul>
        {prop[0].languages.map((el) => (
          <li key={el.name}>{el.name}</li>
        ))}
      </ul>
      <img style={{ height: 200, width: 240 }} src={prop[0].flag} />
      <Weather name={prop[0].capital}/>
    </div>
      
  );
};
export default Expanded