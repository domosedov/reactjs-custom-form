import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from './context'
import SelectOption from './SelectOption'

const SelectField = ({ field, label, name, required }) => {
  const { state, dispatch } = useContext(FormContext)

  const handleChange = evt => {
    dispatch({ type: `change_${field.name}`, payload: evt.target.value })
  }

  return (
    <div className="mb-4 flex flex-col">
      <label className="text-gray-800 font-light mb-1" htmlFor={name}>
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <select
        className={`${
          state[name] === '' ? 'text-gray-500' : ' text-gray-700'
        } px-2 py-2 block border bg-white rounded duration-200 hover:border-indigo-300 focus:outline-none focus:shadow-outline font-light`}
        name={name}
        id={field.name}
        onChange={handleChange}
        value={state[name]}
      >
        <Fragment>
          <option
            className="text-gray-400 bg-gray-200"
            value=""
          >
            Выбрать...
          </option>
          {field.options.map((item) => (
            <SelectOption key={item.value} {...item} />
          ))}
        </Fragment>
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
  }),
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool
}

export default SelectField
