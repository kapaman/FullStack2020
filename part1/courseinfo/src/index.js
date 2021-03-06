import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
const Header = (props) => {
  return <h1> {props.course.name} </h1>;
};
const Part = (props) => {
  return (
    <p>
      
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0].name} exercise={props.part[0].exercises} />
      <Part part={props.part[1].name} exercise={props.part[1].exercises} />
      <Part part={props.part[2].name} exercise={props.part[2].exercises} />
    </div>
  );
};
const Total = (props) => {
  return (<p> Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises} </p>);
};
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content
        part={course.parts}
      />
      <Total total={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);