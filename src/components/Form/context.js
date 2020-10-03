import { createContext } from 'react'

export const FormStateContext = createContext(null)
FormStateContext.displayName = 'FormState'

export const FormDispatchContext = createContext(null)
FormDispatchContext.displayName = 'FormDispatch'
