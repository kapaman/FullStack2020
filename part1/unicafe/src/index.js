import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const H1=({text})=>{
     return <h1>{text}</h1>
}
const Statistics=(x)=>{
    if(x.feedbackGiven){
        return(<>
               <table><tbody>
         <tr>
               <td>good</td>
               <td>{x.good}</td>
        </tr><tr>
               <td>bad</td>
               <td>{x.bad}</td>
        </tr><tr>
               <td>neutral</td>
               <td>{x.neutral}</td>
        </tr><tr>
               <td>all</td>
               <td>{x.all}</td>
        </tr><tr>
               <td>average</td>
               <td>{x.average.toFixed(2)}%</td>
        </tr><tr>
               <td>positive</td>
               <td>{x.positive.toFixed(2)}%</td>
        </tr>
        
            </tbody></table>
        </>
            )
    }else{
        return <p>no feedback given</p>
    }
    
}
const Button = ({onclick,text})=>{
    return (
    <button onClick={onclick}>{text}</button>
    )
};
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
    <H1 text={"give feedback"}/>
      <Button onclick={()=>setGood(good+1)} text={"good"}/>
      <Button onclick={()=>setNeutral(neutral+1)} text={"neutral"}/>
      <Button onclick={()=>setBad(bad+1)} text={"bad"}/>
      <H1 text={"statistics"} />
     
          <Statistics good={good} bad={bad} neutral={neutral} all={good+bad+neutral} average={(!(good-bad)/(good+bad+neutral)?0:(good-bad)/(good+bad+neutral))} positive={(!(good/(good+bad+neutral)*100)?0:good/(good+bad+neutral))} feedbackGiven={good+bad+neutral>0}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)