import React, { Fragment, useContext, memo } from 'react'
import { FormDispatchContext } from './context'
import PropTypes from 'prop-types'

const AgreeCheckboxField = ({ name, currentValue, required = false }) => {
  const dispatch = useContext(FormDispatchContext)
  const label = (
    <Fragment>
      На обработку персональных данных и с{' '}
      <a className="font-normal text-indigo-600 underline" href={'#'}>договором оферты</a>
    </Fragment>
  )
  const handleChange = () => {
    dispatch({ type: 'CHANGE_AGREE', payload: { name } })
  }

  return (
    <div className="mb-4">
      <div className="text-gray-800 font-light mb-1 md:text-center">
        {label}
        {required && <span className="text-red-600">*</span>}
      </div>
      <div className="flex items-center justify-start md:justify-center">
        <p className="text-gray-800 font-light text-sm mr-2">Согласен</p>
        <div
          role="checkbox"
          aria-labelledby={name}
          aria-checked={currentValue}
          tabIndex="0"
          className={`${
            currentValue
              ? 'bg-teal-400 border-transparent'
              : 'bg-white border-indigo-500'
          } border-2 rounded cursor-pointer text-white w-8 h-8 flex items-center justify-center duration-200 focus:outline-none focus:shadow-outline`}
          onKeyPress={handleChange}
          onClick={handleChange}
        >
          <svg
            className="pointer-events-none w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

AgreeCheckboxField.propTypes = {
  name: PropTypes.string,
  currentValue: PropTypes.bool,
  required: PropTypes.bool
}

export default memo(AgreeCheckboxField)
