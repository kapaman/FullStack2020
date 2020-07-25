import React from 'react'

const Form =(props) => {

  return (
    <form onSubmit ={props.onsubmit}>
      <h1>
          log in to the application
      </h1>
      <div>
          username
        <input type="text" value = {props.username} name="Username" onChange ={props.onchange} id="username"></input>
      </div>
      <div>
        password
        <input type="password" value = {props.password} name="Password" onChange ={props.onchange} id="password"></input>
      </div>
      <div>
        <button type="submit" id="submit">Login</button>
      </div>
    </form>
  )

}
export default Form