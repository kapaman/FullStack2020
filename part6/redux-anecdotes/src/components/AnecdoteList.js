import React from 'react'
import {createVoteAction} from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
 import { useDispatch,useSelector } from 'react-redux'
import {addNotification} from '../reducers/notificationReducer';

const AnecdoteList=(props)=>{
    const dispatch = useDispatch()
    //const anecdotes = useSelector(state=>state.anecdotes);
    // anecdotes.forEach(anec=>console.log(anec.id));
    
    //const filter = useSelector(state=>state.filter)

    const vote = (id) => {
        dispatch(createVoteAction(props.anecdotes.find(el=>el.id===id)))
      }
    const notify = (anecdote)=>{
        dispatch(addNotification(anecdote.content,'LIKE_ANECDOTE',5));
    }


    return (
        <div>
      <h2>Anecdotes</h2>
      {props.anecdotes.filter(el=>(props.filter.data)?el.content.includes(props.filter.data):true).sort((a,b)=>b.votes-a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {vote(anecdote.id);notify(anecdote);}}>vote</button>
          </div>
        </div>
      )}
      </div>
      )
}


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}


const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdoteList