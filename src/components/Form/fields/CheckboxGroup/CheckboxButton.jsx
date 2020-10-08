import React, { memo, useRef } from 'react'
import PropTypes from 'prop-types'

const CheckboxButton = ({
  name,
  label,
  value,
  checkedValue,
  handleChange,
  required = false,
  handleFocus = f => f
}) => {
  const checkboxRef = useRef(null)

  const handleFakeRadioButtonKeyPress = (evt) => {
    if (evt.charCode === 32) {
      checkboxRef.current.click()
    }
  }

  const handleFakeRadioButtonClick = (evt) => {
    checkboxRef.current.click()
  }

  return (
    <span
      role="checkbox"
      aria-labelledby={`${name}-${value}`}
      aria-checked={checkedValue}
      onKeyPress={handleFakeRadioButtonKeyPress}
      onClick={handleFakeRadioButtonClick}
      onFocus={() => handleFocus(name)}
      tabIndex="0"
      className="cursor-pointer bg-white text-gray-700 relative px-2 py-1 font-light rounded border text-center duration-200 hover:text-gray-800 hover:border-teal-200 focus:outline-none focus:shadow-outline"
    >
      <label
        className="flex items-center text-sm pointer-events-none select-none"
        htmlFor={`${name}-${value}`}
      >
        <span className={`${checkedValue ? 'text-teal-500' : 'text-gray-500'}`}>
          <svg
            className="w-6 h-6 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {checkedValue ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            )}
          </svg>
        </span>

        {label}
        <input
          ref={checkboxRef}
          className="absolute h-0 w-0 opacity-0 top-0 left-0"
          type="checkbox"
          name={name}
          id={`${name}-${value}`}
          onChange={handleChange}
          value={value}
          checked={checkedValue}
          tabIndex="-1"
          required={required}
        />
      </label>
    </span>
  )
}

CheckboxButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  checkedValue: PropTypes.bool,
  required: PropTypes.bool,
  handleChange: PropTypes.func,
  handleFocus: PropTypes.func
}

export default memo(CheckboxButton)
