import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from './context'
import SelectOption from './SelectOption'

const SelectField = ({ field }) => {
  const { state, dispatch } = useContext(FormContext)

  const handleChange = evt => {
    dispatch({ type: `change_${field.name}`, payload: evt.target.value })
  }

  return (
    <div className="bg-indigo-400 mb-2">
      <select
        name={field.name}
        id={field.name}
        onChange={handleChange}
        value={state[name]}
      >
        {field.options.map(item => <SelectOption key={item.value} {...item} />)}
      </select>
    </div>
  )
}

SelectField.propTypes = {
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

export default SelectField
