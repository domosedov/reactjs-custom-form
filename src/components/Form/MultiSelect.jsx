import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import MultiSelectOption from './MultiSelectOption'
import { FormContext } from './context'

const MultiSelect = ({ field }) => {
  const { state, dispatch } = useContext(FormContext)

  const handleChange = useCallback((evt) => {
    dispatch({ type: `change_${field.name}`, payload: evt.target.value })
  }, [dispatch, field.name])

  return (
    <div className="px-4 py-2 mb-2 bg-indigo-500 sm:w-1/2 lg:w-1/3">
      {field.options.map((item) => (
        <MultiSelectOption
          key={item.value}
          label={item.label}
          value={item.value}
          name={field.name}
          handleChange={handleChange}
          checkedValue={state[field.name][item.value]}
        />
      ))}
    </div>
  )
}

MultiSelect.propTypes = {
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

export default MultiSelect
