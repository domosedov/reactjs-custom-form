import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles.css'

var mountNode = document.getElementById('app')
ReactDOM.render(
  <StrictMode>
    <App name="Jane" />
  </StrictMode>,
  mountNode
)
