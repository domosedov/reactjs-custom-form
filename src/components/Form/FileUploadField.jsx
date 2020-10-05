import React, { useRef, useState, useContext, useEffect, memo } from 'react'
import { FormDispatchContext } from './context'

const FileUploadField = ({
  currentValue = null,
  label = '',
  name = '',
  required = false
}) => {
  const dispatch = useContext(FormDispatchContext)
  const [imageSource, setImageSource] = useState('')
  const fileRef = useRef(null)

  const handleClick = (evt) => {
    evt.preventDefault()
    fileRef.current.click()
  }

  const handleChange = (evt) => {
    if (evt.target.files.length) {
      dispatch({ type: 'SET_FILE', payload: { value: evt.target.files[0], name } })
    }
  }

  const handleDeleteClick = () => {
    dispatch({ type: 'UNSET_FILE', payload: { name } })
  }

  useEffect(() => {
    if (currentValue) {
      const reader = new FileReader()
      reader.addEventListener('load', (e) => {
        setImageSource(e.target.result)
      })
      reader.readAsDataURL(currentValue)
    } else {
      setImageSource('')
    }
  }, [currentValue])

  return (
    <div className="h-full flex flex-col pb-4">
      <label className="text-gray-800 font-light mb-1" htmlFor="photo">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      {!currentValue ? (
        <div className="relative px-2 py-2 border-4 border-dashed border-gray-300 h-full flex items-center justify-center">
          <button
            type="button"
            onClick={handleClick}
            className="h-full w-full text-indigo-400 font-light duration-200 flex flex-col items-center justify-center hover:text-indigo-500 hover:bg-indigo-100 focus:shadow-outline focus:outline-none"
          >
            <svg
              className="h-12 w-12"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm upperc text-gray-500">
              макcимальный размер файла - 5 MB
            </span>
          </button>
          <input
            className="absolute h-0 w-0 opacity-0 top-0 left-0"
            ref={fileRef}
            onChange={handleChange}
            type="file"
            id={name}
            name={name}
            tabIndex="-1"
            accept=".png, .jpg, .jpeg"
          />
        </div>
      ) : (
        <div className="h-full flex space-x-4">
          <div className="relative h-48 w-32">
            <div className="h-48 w-32 overflow-hidden shadow rounded">
              <img
                className="w-full h-full object-cover"
                src={imageSource}
                alt="Предпросмотр фото"
              />
            </div>
            <button
              onClick={handleDeleteClick}
              type="button"
              className="absolute top-0 right-0 -mt-2 -mr-2 text-white bg-red-500 rounded-full px-2 py-2 duration-200 hover:bg-red-600 focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-48 overflow-y-auto overflow-x-none overscroll-auto flex flex-col justify-between items-start">
            <div>
              <div className="text-sm text-gray-900 font-light">Имя файла</div>
              <div className="text-xs mb-2 text-gray-600 overflow-x-auto overflow-y-hidden">
                {currentValue.name}
              </div>
              <div className="text-sm text-gray-900 font-light">Тип файла</div>
              <div className="text-xs mb-2 text-gray-600 overflow-x-auto overflow-y-hidden">
                {currentValue.type}
              </div>
              <div className="text-sm text-gray-900 font-light">
                Размер файла
              </div>
              <div className="text-xs mb-2 text-gray-600 overflow-x-auto overflow-y-hidden">
                {`${(currentValue.size / 1000).toFixed(2)} KB`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(FileUploadField)
