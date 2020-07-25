import React from "react";
import ReactDOM from "react-dom";

const TotalEx=(props)=> {
    let x =props.total.reduce((total,el)=>total+el);
    console.log(x);
    return <h3> total of {x} exercises</h3>;

};
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Header = ({name}) => <h1> {name} </h1>;
const Course=(props)=>{
    return <>
    <Header name={props.course.name} />
    {props.course.parts.map(el=><Part part={el.name} exercise={el.exercises} key={el.id} />)}
    <TotalEx total={props.course.parts.map(el=>el.exercises)}/>
    </>
    
    
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.name} exercise={props.course.exercises} key={props.course.id} />
    </div>
  );
};
export default Course