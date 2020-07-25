import React from "react";

const NamesnNum = (props) => {
   return props.del?(
    <li>
      {props.name} {props.number}<button id={props.id} key={props.id} onClick={props.deletePerson}> delete</button>
    </li>
  ):(
    <li>
      {props.name} {props.number}
    </li>
  );
};

export default NamesnNum