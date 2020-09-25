import React, { memo } from 'react'
import PropTypes from 'prop-types'

const RadioButton = ({
  name,
  label,
  value,
  checkedValue,
  handleChange,
  required = false
}) => {
  return (
    <div className="bg-red-100">
      <label htmlFor={`${name}-${value}`}>{label}</label>
      <input
        type="radio"
        name={name}
        id={`${name}-${value}`}
        onChange={handleChange}
        value={value}
        checked={String(value) === checkedValue}
        required={required}
      />
    </div>
  )
}

RadioButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  checkedValue: PropTypes.string,
  required: PropTypes.bool,
  handleChange: PropTypes.func
}

export default memo(RadioButton)
