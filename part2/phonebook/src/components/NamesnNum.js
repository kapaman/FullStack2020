import React from "react";
import ReactDOM from "react-dom";
const NamesnNum = (props) => {
  return (
    <li>
      {props.name} {props.number}
    </li>
  );
};

export default NamesnNum