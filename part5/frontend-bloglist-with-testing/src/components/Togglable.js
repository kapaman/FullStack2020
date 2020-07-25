
import React, { useState } from 'react'
import propTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={hideWhenVisible} >
        <button onClick={toggleVisibility} className={props.buttonLabel} >{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="Togglable">
        {props.children}
        <button onClick={toggleVisibility}>{props.removeButton?props.removeButton:'cancel'}</button>
      </div>
    </div>
  )
}

Togglable.propTypes={
  buttonLabel : propTypes.string.isRequired,
}
export default Togglable