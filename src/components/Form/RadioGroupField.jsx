import React, { useContext, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { FormDispatchContext } from './context'
import RadioButton from './RadioButton'

const RadioGroupField = ({
  options = [],
  name = '',
  label = '',
  required = false,
  currentValue = ''
}) => {
  const dispatch = useContext(FormDispatchContext)

  const handleChange = useCallback(
    (evt) => {
      dispatch({ type: `CHANGE_${name}`, payload: { value: evt.target.value, name } })
    },
    [dispatch, name]
  )

  return (
    <div className="mb-4 flex flex-col">
      <span className="text-gray-800 font-light mb-1">
        {label}
        {required && <span className="text-red-600">*</span>}
      </span>
      <div className="flex items-center space-x-4">
        {options.map((item) => (
          <RadioButton
            checkedValue={currentValue}
            name={name}
            label={item.title}
            key={item.value}
            value={item.value}
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  )
}

RadioGroupField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string
    })
  ),
  required: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  currentValue: PropTypes.string
}

export default memo(RadioGroupField)
