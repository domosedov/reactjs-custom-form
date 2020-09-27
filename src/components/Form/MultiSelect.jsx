import React, { useCallback, useContext, useRef, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import MultiSelectOption from './MultiSelectOption'
import { FormContext } from './context'
import MultiSelectItemsSelected from './MultiSelectItemsSelected'

const selector = (state, key) => state[key]

const computeSelectedItems = (field, state) => {
  const { name } = field
  const slice = selector(state, name)
  return field.options.filter((item) => {
    return slice[item.value]
  })
}

const MultiSelect = ({ field, label, required = false }) => {
  const { state, dispatch } = useContext(FormContext)
  const [isOpen, setIsOpen] = useState(false)
  const itemsListRef = useRef(null)
  const buttonRef = useRef(null)
  const areaButtonRef = useRef(null)

  const handleChange = useCallback((evt) => {
    dispatch({ type: `change_${field.name}`, payload: evt.target.value })
  }, [dispatch, field.name])

  useEffect(() => {
    if (isOpen && itemsListRef.current) {
      itemsListRef.current.scrollIntoView({
        behavior: 'smooth'
      })
      itemsListRef.current.focus()
    }
  }, [itemsListRef, isOpen])

  const selectedItems = useMemo(() => {
    return computeSelectedItems(field, state)
  }, [field, state])

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
    <div className="mb-4 flex flex-col">
      <span className="text-gray-800 font-light mb-1">
        {label}
        {required && <span className="text-red-600">*</span>}
      </span>
      <div className="relative border min-h-10 rounded flex justify-between">
        {selectedItems.length ? (
          <div className="px-2 py-2 w-full h-full min-h-10">
            <MultiSelectItemsSelected
              handleClick={handleChange}
              items={selectedItems}
            />
          </div>
        ) : (<div
          ref={areaButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer px-2 py-2 w-full h-full min-h-10"
        >
          <span className="text-gray-500 font-light">Выбрать...</span>
        </div>)
        }
        <button
          id={`button-${label}`}
          ref={buttonRef}
          className="w-6 text-gray-500 bg-gray-100 duration-200 hover:text-gray-800 focus:outline-none focus:shadow-outline"
          onClick={() => setIsOpen(!isOpen)}
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
          </div>
        )}
      </div>
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
  }),
  label: PropTypes.string,
  required: PropTypes.bool
}

export default MultiSelect
