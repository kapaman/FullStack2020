import React from 'react'
import {createAnecdoteAction} from '../reducers/anecdoteReducer'
//import { useDispatch } from 'react-redux'
import {connect} from 'react-redux';
import {addNotification,removeNotification} from '../reducers/notificationReducer';
const AnecdoteForm=(props)=>{
    //const dispatch = useDispatch()
    const addAnecdote= (event)=>{
        event.preventDefault();
        let content = event.target.anecdote.value;
        event.target.anecdote.value='';
        props.createAnecdoteAction(content)
        props.addNotification(content,'NEW_ANECDOTE',5);
      }
  

    return (
        <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
      </div>
      )
}

const mapDispatchtoProps = {
  createAnecdoteAction,
  addNotification
}





const ConnectedAnecdoteForm = connect(null,mapDispatchtoProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
