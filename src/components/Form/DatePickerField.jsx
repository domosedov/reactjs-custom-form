import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from './context'

const DatePickerField = ({ label, name, required = false }) => {
  const { state, dispatch } = useContext(FormContext)
  const handleChange = (evt) => {
    dispatch({ type: `change_${name}`, payload: evt.target.value })
  }

  const currentDate = useMemo(() => new Date().toISOString().split('T')[0], [])

  return (
    <div className="mb-4 flex flex-col">
      <label className="text-gray-800 font-light mb-1" htmlFor={name}>
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        className="border px-2 py-2 rounded md:px-1 md:py-1 duration-200 hover:border-indigo-300 focus:outline-none focus:shadow-outline text-gray-700 font-light"
        type="date"
        name={name}
        id={name}
        value={state[name]}
        onChange={handleChange}
        max={currentDate}
      />
    </div>
  )
}

DatePickerField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool
}

export default DatePickerField
