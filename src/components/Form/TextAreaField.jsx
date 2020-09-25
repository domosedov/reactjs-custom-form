import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from './context'

const TextAreaField = ({ label, name, required = false, type = 'text' }) => {
  const { state, dispatch } = useContext(FormContext)

  const handleChange = (evt) => {
    dispatch({ type: `change_${name}`, payload: evt.target.value })
  }

  return (
    <div className="bg-indigo-400 px-2 py-1 mb-2">
      <label htmlFor={name}>{label}</label>
      <textarea
        type={type}
        id={name}
        name={name}
        value={state[name]}
        onChange={handleChange}
        required={required}
      />
    </div>
  )
}

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool
}

export default TextAreaField
