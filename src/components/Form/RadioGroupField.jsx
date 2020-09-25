import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from './context'
import RadioButton from './RadioButton'

const RadioGroupField = ({ field }) => {
  const { state, dispatch } = useContext(FormContext)

  const handleChange = useCallback(
    (evt) => {
      console.log(evt.target.value)
      dispatch({ type: `change_${field.name}`, payload: evt.target.value })
    },
    [dispatch, field.name]
  )

  return (
    <div className="bg-indigo-400 px-2 py-1 mb-2">
      <div></div>
      {field.options.map((item) => (
        <RadioButton
          checkedValue={state[field.name]}
          name={field.name}
          label={item.label}
          key={item.value}
          value={item.value}
          handleChange={handleChange}
          required={true}
        />
      ))}
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
  })
}

export default RadioGroupField
