import React, { useContext, useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import { FormDispatchContext } from '../context'

const DatePickerField = ({ label = '', name = '', currentValue = '', required = false, placeholder = '', isInvalid = false, handleFocus = f => f }) => {
  const dispatch = useContext(FormDispatchContext)
  const handleChange = (evt) => {
    dispatch({ type: `CHANGE_${name}`, payload: { value: evt.target.value, name } })
  }

  const currentDate = useMemo(() => new Date().toISOString().split('T')[0], [])

  return (
    <div className={`${isInvalid && 'shadow-error'} mb-4 flex flex-col`}>
      <label className="text-gray-800 font-light mb-1" htmlFor={name}>
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        className="border px-2 py-2 rounded md:px-1 md:py-1 duration-200 hover:border-indigo-300 focus:outline-none focus:shadow-outline text-gray-700 font-light"
        type="date"
        name={name}
        id={name}
        value={currentValue}
        onChange={handleChange}
        max={currentDate}
        placeholder={placeholder}
        onFocus={handleFocus}
      />
    </div>
  )
}

DatePickerField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  currentValue: PropTypes.string,
  required: PropTypes.bool,
  handleFocus: PropTypes.func,
  isInvalid: PropTypes.bool
}

export default memo(DatePickerField)
