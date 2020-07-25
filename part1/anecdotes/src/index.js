import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const MostVotes=(props)=>{
    return <p>{props.text} has {props.vote} votes.</p>
}
const Button=(props)=>{
    return <button onClick={props.onclick}>{props.text}</button>
}
 const Votes=(props)=>{
     return <p>This anecdote has {props.vote[props.selected]} votes</p>
 }
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,voteSelected]=useState({
      0:0,
      1:0,
      2:0,
      3:0,
      4:0,
      5:0
  })

    const getRandom=()=>{
       let Random = Math.floor(Math.random()*6);
    return Random;
    }
    const getMostVoted=()=>{
        let mostvoted=votes[0];
        var x=0;
        for(let i =1;i<6;i++){
            if(votes[i]>mostvoted){
                mostvoted = votes[i];
                x=i;
            }
        }
        return [mostvoted,x];
    }
      const handleVotes=(random)=>{
    const newVotes={
        ...votes,
    };
        
        newVotes[random]+=1;
    voteSelected(newVotes);
       
}
  return (
    <div>
      <div>
      {props.anecdotes[selected]}
  </div>
  <Button text={"next ancedote"} onclick={()=>{
      let x=getRandom();
      setSelected(x);}}/>
  <Button onclick={()=>handleVotes(selected)} text={"vote"}/>
  <Votes vote={votes} selected={selected}/>
  <h1>Anecdote with most votes</h1>
  <MostVotes text={props.anecdotes[getMostVoted()[1]]} vote={votes[getMostVoted()[1]]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)