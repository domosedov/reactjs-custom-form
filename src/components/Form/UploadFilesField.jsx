import React, { useRef, useContext, useEffect, useState } from 'react'
import { FormContext } from './context'
import { readAsDataURL } from './helpers'

const UploadFilesField = () => {
  const uploadButtonRef = useRef(null)
  const { state, dispatch } = useContext(FormContext)
  const [imageSources, setImageSourses] = useState([])

  const handleClick = (evt) => {
    evt.preventDefault()
    if (uploadButtonRef.current) {
      uploadButtonRef.current.click()
    }
  }

  const handleChange = (evt) => {
    if (evt.target.files.length) {
      dispatch({
        type: 'set_documents',
        payload: Array.from(evt.target.files)
      })
    }
  }

  const handleEmptyButtonClick = () => {
    dispatch(
      { type: 'empty_documents' }
    )
  }

  useEffect(() => {
    if (state.documents.length) {
      Promise.all(state.documents.map(doc => readAsDataURL(doc)))
        .then(urls => {
          console.log(urls)
          setImageSourses(urls)
        }).catch(console.error)
    } else {
      setImageSourses([])
    }
  }, [state.documents])

  return (
    <div className="h-full flex flex-col pb-4">
      <label
        className="text-gray-800 font-light mb-1 pointer-events-none"
        htmlFor="documents"
      >
        Документы
      </label>
      <span className="text-gray-600 font-light text-sm">
        Например документы об образовании, дипломы, сертификаты, награды и т.д.
      </span>
      <span className="text-gray-600 font-light text-sm mb-2 border border-dashed px-1 py-1">
        Чтобы добавить сразу несколько файлов, выбирайте их удерживая клавишу{' '}
        <b className="font-normal text-gray-800">&quot;CTRL&quot;</b> или{' '}
        <b className="font-normal text-gray-800">&quot;SHIFT&quot;</b>
      </span>
      <div className="flex items-center flex-wrap gap-1 mb-2">
        {imageSources.length > 0 &&
          imageSources.map((src, index) => (
            <div key={index} className="w-20 h-20 overflow-auto">
              <img
                className="w-full h-full object-cover"
                alt={`Документ-${index}`}
                src={src}
              />
            </div>
          ))}
      </div>
      <div className="relative inline-flex space-x-2">
        <button
          className="inline-flex items-center font-light px-2 py-1 bg-indigo-600 text-white rounded duration-200 hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleClick}
        >
          Добавить
          <svg
            className="ml-1 w-6 h-6 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        {state.documents.length > 0 && (
          <button
            className="inline-flex items-center font-light px-2 py-1 bg-red-600 text-white rounded duration-200 hover:bg-red-500 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleEmptyButtonClick}
          >
            Очистить
            <svg
              className="ml-1 w-6 h-6 pointer-events-none"
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
        )}
        <input
          className="absolute h-0 w-0 opacity-0 top-0 left-0"
          multiple={true}
          ref={uploadButtonRef}
          onChange={handleChange}
          type="file"
          name="documents"
          id="documents"
          tabIndex="-1"
          accept=".png, .jpg, .jpeg"
        />
      </div>
    </div>
  )
}

export default UploadFilesField
