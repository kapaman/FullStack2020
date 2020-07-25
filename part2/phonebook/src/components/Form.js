import React from "react";
import ReactDOM from "react-dom";



 const Form=(props)=>{
     return(
        <form onSubmit={props.onsubmit}>
        <h2>add new number</h2>
        <div>
          name: <input value={props.newname} onChange={props.handlename} />
        </div>
        <div>
          number: <input value={props.newnumber} onChange={props.handlenumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
     )
 }
export default Form