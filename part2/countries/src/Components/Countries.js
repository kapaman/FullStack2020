import React from "react";
import Expanded from "./Expanded"

const Countries = (props) => {
  let filteredcountries = props.data;
  //    FILTER THE RECEIVED DATA

   if(filteredcountries) {
       if (props.name){ 
           if (props.name.replace(" ", "").length > 0) {
      filteredcountries = filteredcountries.filter((el) => {
        return el.name.toLowerCase().includes(props.name.toLowerCase());
      });

    }
       }


  if (filteredcountries.length > 10 && filteredcountries.length !== 1) {
    return <p>Too many matches specify another filter</p>;
  } 
    else if (filteredcountries.length < 10 && filteredcountries.length !== 1) {
    return (
      <ul>
        {filteredcountries.map((el) => (
          
            <li key={Math.random()}>{el.name}<button id={el.name} onClick={props.onclick}>
              show
            </button></li>
           
        ))}
      </ul>
    );
  } else if (filteredcountries.length === 1) {
    
    return <Expanded prop={filteredcountries} />;
  }} return <h1> countries</h1>
};
export default Countries