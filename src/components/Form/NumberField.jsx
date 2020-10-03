import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { FormDispatchContext, FormStateContext } from './context'

const NumberField = ({ label, name, min = 0, max = 1000000, step = 1, required = false }) => {
  const state = useContext(FormStateContext)
  const dispatch = useContext(FormDispatchContext)

  const handleChange = (evt) => {
    dispatch({ type: `change_${name}`, payload: evt.target.value })
  }

  const value = Number(state[name])

  return (
    <div className="mb-4 flex flex-col">
      <label className="text-gray-800 font-light mb-1" htmlFor={name}>
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        className="border px-2 py-2 rounded md:px-1 md:py-1 duration-200 hover:border-indigo-300 focus:outline-none focus:shadow-outline text-gray-700 font-light"
        type="number"
        id={name}
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
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
