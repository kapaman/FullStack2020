import React from "react";
import '../index.css';

const Notification = (props) => {
    
  if (props.props===null) {
    return null
  }
  return (
    <div className={props.props.type}>
     {props.props.msg}
    </div>
  )
}

export default Notification