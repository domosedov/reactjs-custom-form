import React, { useContext, Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import { FormDispatchContext } from './context'
import SelectOption from './SelectOption'

const SelectField = ({ options, label, name, required, currentValue }) => {
  const dispatch = useContext(FormDispatchContext)

  const handleChange = evt => {
    dispatch({ type: `CHANGE_${name}`, payload: { value: evt.target.value, name } })
  }

  return (
    <div className="mb-4 flex flex-col">
      <label className="text-gray-800 font-light mb-1" htmlFor={name}>
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <select
        className={`${
          currentValue === '' ? 'text-gray-500' : ' text-gray-700'
        } px-2 py-2 block border bg-white rounded duration-200 hover:border-indigo-300 focus:outline-none focus:shadow-outline font-light`}
        name={name}
        id={name}
        onChange={handleChange}
        value={currentValue}
      >
        <Fragment>
          <option className="text-gray-400 bg-gray-200" value="">
            Выбрать...
          </option>
          {options.map((item) => (
            <SelectOption key={item.value} {...item} />
          ))}
        </Fragment>
      </select>
    </div>
  )
}

SelectField.propTypes = {
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

export default memo(SelectField)
