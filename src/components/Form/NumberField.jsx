import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from './context'

const NumberField = ({ label, name, min = 0, max = 1000000, step = 1, required = false }) => {
  const { state, dispatch } = useContext(FormContext)

  const handleChange = (evt) => {
    dispatch({ type: `change_${name}`, payload: evt.target.value })
  }

  return (
    <div className="bg-indigo-400 px-2 py-1 mb-2">
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        name={name}
        value={state[name]}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        required={required}
      />
    </div>
  )
}

NumberField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  required: PropTypes.bool
}

export default NumberField
