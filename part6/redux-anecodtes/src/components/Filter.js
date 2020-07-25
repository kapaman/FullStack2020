import React from 'react'
import {newFilterAction} from '../reducers/filterReducer';
//import {useDispatch} from 'react-redux'
import {connect} from 'react-redux'
const Filter = (props) => {
// const dispatch = useDispatch()
  const handleChange = (event) => {
    props.newFilterAction(event.target.value)
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10,
    marginTop:20
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchtoProps =  {newFilterAction}
  


const ConnectedFilter = connect(null,mapDispatchtoProps)(Filter)
export default ConnectedFilter