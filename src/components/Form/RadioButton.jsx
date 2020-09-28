import React, { memo, useRef } from 'react'
import PropTypes from 'prop-types'

const RadioButton = ({
  name,
  label,
  value,
  checkedValue,
  handleChange,
  required = false
}) => {
  const radioRef = useRef(null)

  const handleFakeRadioButtonKeyPress = (evt) => {
    if (evt.charCode === 32) {
      radioRef.current.click()
    }
  }

  const handleFakeRadioButtonClick = (evt) => {
    radioRef.current.click()
  }

  return (
    <span
      role="radio"
      aria-labelledby={`${name}-${value}`}
      aria-checked={String(value) === checkedValue}
      onKeyPress={handleFakeRadioButtonKeyPress}
      onClick={handleFakeRadioButtonClick}
      tabIndex="0"
      className={`${
        String(value) === checkedValue
          ? 'bg-indigo-500 text-white border-teal-200'
          : 'bg-white text-gray-700 border-indigo-200'
      } relative px-2 py-1 w-full  font-light rounded border-2 text-center duration-200 hover:bg-indigo-400 hover:text-white focus:outline-none focus:shadow-outline`}
    >
      <label className="pointer-events-none" htmlFor={`${name}-${value}`}>
        {label}
        <input
          ref={radioRef}
          className="absolute h-0 w-0 opacity-0 top-0 left-0"
          type="radio"
          name={name}
          id={`${name}-${value}`}
          onChange={handleChange}
          value={value}
          checked={String(value) === checkedValue}
          tabIndex="-1"
        />
      </label>
    </span>
  )
}

RadioButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  checkedValue: PropTypes.string,
  required: PropTypes.bool,
  handleChange: PropTypes.func
}

export default memo(RadioButton)
