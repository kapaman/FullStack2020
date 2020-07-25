import React from "react";

import NamesnNum from "./NamesnNum"
const NumSection=(props)=>{
    return(
        <div>
    <h2>{props.heading}</h2>
      <ul>
        {props.arr.map((el) => (
       
          <NamesnNum id={el.id} deletePerson={props.deletePerson} key={el.name} name={el.name} number={el.number} del={props.del}/>
        ))}
      </ul></div>)
}
export default NumSection;