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
    <div className="bg-indigo-400 px-2 py-1 mb-2">
      <label htmlFor="">{label}</label>
      <input
        type="date"
        required={required}
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
