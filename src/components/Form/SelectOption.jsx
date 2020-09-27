import React, { memo } from 'react'
import PropTypes from 'prop-types'

const SelectOption = ({ value, label }) => {
  return (
    <option className="text-gray-700 bg-gray-100" value={value}>{label}</option>
  )
}

SelectOption.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string
}

export default memo(SelectOption)
