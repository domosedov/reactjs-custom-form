import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FormDispatchContext, FormStateContext } from './context'
import RadioButton from './RadioButton'

const RadioGroupField = ({ field, label, required = false }) => {
  const state = useContext(FormStateContext)
  const dispatch = useContext(FormDispatchContext)

  const handleChange = useCallback(
    (evt) => {
      dispatch({ type: `change_${field.name}`, payload: evt.target.value })
    },
    [dispatch, field.name]
  )

  return (
    <div className="mb-4 flex flex-col">
      <span className="text-gray-800 font-light mb-1">
        {label}
        {required && <span className="text-red-600">*</span>}
      </span>
      <div className="flex items-center space-x-4">
        {field.options.map((item) => (
          <RadioButton
            checkedValue={state[field.name]}
            name={field.name}
            label={item.label}
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
  field: PropTypes.shape({
    multiple: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number
      })
    )
  }),
  required: PropTypes.bool,
  label: PropTypes.string
}

export default RadioGroupField
