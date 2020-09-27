import React from 'react'
import PropTypes from 'prop-types'

const MultiSelectItemsSelected = ({ items, handleClick }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <span
          className="px-1 py-1 bg-gray-200 text-sm text-gray-700 font-light rounded inline-flex items-center"
          key={item.value}
        >
          <p className="mr-1">{item.label}</p>
          <button
            className="bg-red-600 text-white rounded-full duration-200 hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            value={item.value}
            onClick={handleClick}
          >
            <svg
              className="w-4 h-4 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      ))}
    </div>
  )
}

MultiSelectItemsSelected.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  })),
  handleClick: PropTypes.func
}

export default MultiSelectItemsSelected
