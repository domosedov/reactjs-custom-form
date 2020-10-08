import React, { useCallback, useContext, useRef, useState, useEffect, useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import MultiSelectOption from './MultiSelectOption'
import { FormDispatchContext } from '../../context'
import MultiSelectCheckedOptions from './MultiSelectCheckedOptions'

const computeSelectedItems = (currentValue, options) => {
  return options.filter((item) => {
    return currentValue[item.value]
  })
}

const MultiSelectField = ({
  options = [],
  name = '',
  currentValue = {},
  label,
  required = false,
  isInvalid = false,
  handleFocus = (f) => f
}) => {
  const dispatch = useContext(FormDispatchContext)
  const [isOpen, setIsOpen] = useState(false)
  const itemsListRef = useRef(null)
  const buttonRef = useRef(null)
  const areaButtonRef = useRef(null)

  const handleChange = useCallback(
    (evt) => {
      dispatch({
        type: `CHANGE_${name}`,
        payload: { value: evt.target.value, name }
      })
    },
    [dispatch, name]
  )

  useEffect(() => {
    if (isOpen && itemsListRef.current) {
      itemsListRef.current.scrollIntoView({
        behavior: 'smooth'
      })
      itemsListRef.current.focus()
    }
  }, [itemsListRef, isOpen])

  const selectedItems = useMemo(() => {
    return computeSelectedItems(currentValue, options)
  }, [currentValue, options])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        itemsListRef.current &&
        !itemsListRef.current.contains(event.target) &&
        event.target !== buttonRef.current &&
        event.target !== areaButtonRef.current
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [itemsListRef, buttonRef])

  return (
    <div className={`${isInvalid && 'shadow-error'} mb-4 flex flex-col`}>
      <span className="text-gray-800 font-light mb-1">
        {label}
        {required && <span className="text-red-600">*</span>}
      </span>
      <div className="relative border min-h-10 rounded flex justify-between">
        {selectedItems.length ? (
          <div className="px-2 py-2 w-full h-full min-h-10">
            <MultiSelectCheckedOptions
              handleClick={handleChange}
              items={selectedItems}
            />
          </div>
        ) : (
          <div
            ref={areaButtonRef}
            onClick={() => {
              setIsOpen(!isOpen); handleFocus(name)
            }}
            className="cursor-pointer px-2 py-2 w-full h-full min-h-10"
          >
            <span className="text-gray-500 font-light">Выбрать...</span>
          </div>
        )}
        <button
          id={`button-${label}`}
          ref={buttonRef}
          className="w-6 text-gray-500 bg-gray-100 duration-200 hover:text-gray-800 focus:outline-none focus:shadow-outline"
          onClick={() => setIsOpen(!isOpen)}
          onFocus={() => handleFocus(name)}
          type="button"
        >
          <svg
            className="h-6 w-6 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            )}
          </svg>
        </button>
      </div>
      <div className="relative">
        {isOpen && (
          <div
            ref={itemsListRef}
            className="bg-gray-100 absolute top-auto z-10 w-full border border-gray-500 max-h-64 overflow-y-auto"
          >
            <div className="flex flex-col">
              {options.map((item) => (
                <MultiSelectOption
                  key={item.value}
                  label={item.title}
                  value={item.value}
                  name={name}
                  handleChange={handleChange}
                  checkedValue={currentValue[item.value]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string
    })
  ),
  required: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  currentValue: PropTypes.object,
  isInvalid: PropTypes.bool,
  handleFocus: PropTypes.func
}

export default memo(MultiSelectField)
