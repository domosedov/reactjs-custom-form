import React from 'react'
import Form from './components/Form/Form'

const App = () => {
  return (
    <div className="bg-gray-200 h-full min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-6xl text-center text-indigo-700">
          Hello React + TailwindCSS
        </div>
        <Form />
      </div>
    </div>
  )
}

export default App
