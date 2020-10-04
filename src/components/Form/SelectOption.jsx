import React, { memo } from 'react'
import PropTypes from 'prop-types'

const SelectOption = ({ value, title }) => {
  return (
    <option className="text-gray-700 bg-gray-100" value={value}>
      {title}
    </option>
  )
}

SelectOption.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string
}

export default memo(SelectOption)
