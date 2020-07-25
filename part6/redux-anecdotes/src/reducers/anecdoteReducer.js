// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)
import anecdoteService from '../services/anecdoteService';
const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}



// THE ULTIMATE REDUCER/SHOPKEEPER THAT DOES WHAT IS SAID BY AN ACTION
const reducer = (state = [], action) => {

  switch (action.type) {
    case 'INC_VOTE':
      let x = state.find(el => el.id == action.data.id);
      x = {
        ...x,
        votes: x.votes + 1
      }
      return state.map(el => el.id !== x.id ? el : x);
    case 'ADD_ANECDOTE':
      // let obj = asObject(action.data.content);
      return state.concat(action.data);
    case 'INIT_ANECDOTES':
      return action.data
  }
  return state
}
// ACTION CREATORS
export const createAnecdoteAction = (content) => {
  return async dispatch => {
    const anec = await anecdoteService.addAnecdote(content)
    dispatch({
      type: "ADD_ANECDOTE",
      data: anec
    })
  }
}

export const initAnecdotes = () => {
 return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }

}



export const createVoteAction = (anecdote) => {
  return async dispatch => {
    const anec = await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type: "INC_VOTE",
      data: {id:anecdote.id.toString()},
    })
  }
}




export default reducer