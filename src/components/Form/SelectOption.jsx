import React, { memo } from 'react'
import PropTypes from 'prop-types'

const SelectOption = ({ value, label }) => {
  return (
    <option value={value}>{label}</option>
  )
}

SelectOption.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string
}

export default memo(SelectOption)
