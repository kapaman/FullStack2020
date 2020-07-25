import React from "react";
import ReactDOM from "react-dom";
import NamesnNum from "./NamesnNum"
const NumSection=(props)=>{
    return(
        <div>
    <h2>{props.heading}</h2>
      <ul>
        {props.arr.map((el) => (
          <NamesnNum key={el.name} name={el.name} number={el.number} />
        ))}
      </ul></div>)
}
export default NumSection;