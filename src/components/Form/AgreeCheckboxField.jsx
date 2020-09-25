import React, { useContext } from 'react'
import { FormContext } from './context'
import PropTypes from 'prop-types'

const AgreeCheckboxField = ({ name, label, required = false }) => {
  const { state, dispatch } = useContext(FormContext)
  const handleChange = () => {
    dispatch({ type: 'change_agreeOffer' })
  }

  return (
    <div className="bg-green-300 mb-2">
      <label htmlFor={name}>{label}</label>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={state.agreeOffer}
        required={required}
        onChange={handleChange}
      />
    </div>
  )
}

AgreeCheckboxField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool
}

export default AgreeCheckboxField
