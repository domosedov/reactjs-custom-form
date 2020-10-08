import React, { useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'

const mapErrorsToMessages = (inputErrors, messages) => {
  const output = []

  for (const [key, value] of Object.entries(inputErrors)) {
    if (value === true) {
      output.push(messages[key])
    }
  }

  return output
}

const ValidationErrors = ({ messages, inputErrors }) => {
  const blockRef = useRef()

  useEffect(() => {
    blockRef.current &&
      blockRef.current.scrollIntoView({
        behavior: 'smooth'
      })
  }, [])

  const items = useMemo(
    () => mapErrorsToMessages(inputErrors, messages),
    [inputErrors, messages]
  )

  console.log(items)

  return (
    <div
      ref={blockRef}
      className="border border-red-500 bg-red-100 text-red-800 px-2 divide-y divide-red-300 "
    >
      {items &&
        items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm px-2 py-2">
            <div className="font-bold">{item.label}:</div>
            <div className="underline">{item.message}</div>
          </div>
        ))}
    </div>
  )
}

ValidationErrors.propTypes = {
  messages: PropTypes.object,
  inputErrors: PropTypes.object
}

export default ValidationErrors
