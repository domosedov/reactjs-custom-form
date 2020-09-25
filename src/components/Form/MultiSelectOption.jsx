import React, { memo } from 'react'
import PropTypes from 'prop-types'

const MultiSelectOption = ({
  label,
  name,
  value,
  handleChange,
  checkedValue,
  required = false
}) => {
  return (
    <div>
      <label>
        {label}
        <input
          type="checkbox"
          value={value}
          name={name}
          onChange={handleChange}
          checked={checkedValue}
          required={required}
        />
      </label>
    </div>
  )
}

MultiSelectOption.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  checkedValue: PropTypes.bool,
  required: PropTypes.bool,
  handleChange: PropTypes.func
}

export default memo(MultiSelectOption)
