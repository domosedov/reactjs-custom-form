/*
FieldType {
  name: string,
  label: string,
  multiple: boolean,
  type: string,
  valueType: string,
  required: boolean,
  options: any[],
  defaultValue: any,
  placeholder: string
}
*/

export const computeInitialState = (...fields) => {
  const initialState = {}

  if (fields.length) {
    fields.forEach((field) => {
      switch (field.type) {
        case 'select':
        case 'number':
        case 'date':
        case 'textarea':
        case 'radio':
        case 'text': {
          initialState[field.name] = field.defaultValue
          break
        }
        case 'multiselect': {
          initialState[field.name] = {}
          field.options.forEach((option) => {
            initialState[field.name][option.value] = false
          })
          break
        }
        case 'agreeButton': {
          initialState[field.name] = field.defaultValue || false
          break
        }
        case 'file': {
          initialState[field.name] = field.defaultValue || null
          break
        }
        case 'files': {
          initialState[field.name] = field.defaultValue || []
          break
        }
        default:
          throw new Error('Invalid Field (Некорекктное поле)')
      }
    })
  }

  return initialState
}

export const immerReducer = (draft, action) => {
  const TEXT_VALUE_FIELDS = [
    'CHANGE_area',
    'CHANGE_city',
    'CHANGE_dateOfBirth',
    'CHANGE_description',
    'CHANGE_education',
    'CHANGE_email',
    'CHANGE_experiance',
    'CHANGE_gender',
    'CHANGE_lastname',
    'CHANGE_metro',
    'CHANGE_middlename',
    'CHANGE_name',
    'CHANGE_phone',
    'CHANGE_rate',
    'CHANGE_status'
  ]
  const MULTIPLE_VALUE_FIELDS = ['places', 'students', 'subjects']

  const SET_FILE = 'SET_FILE'
  const UNSET_FILE = 'UNSET_FILE'
  const SET_FILES = 'SET_FILES'
  const UNSET_FILES = 'UNSET_FILES'

  if (TEXT_VALUE_FIELDS.includes(action.type)) {
    draft[action.payload.name] = action.payload.value
  } else if (MULTIPLE_VALUE_FIELDS.includes(action.type)) {
    draft[action.payload.name][action.payload.value] = !draft[
      action.payload.name
    ][action.payload.value]
  } else if (action.type === SET_FILE) {
    draft[action.payload.name] = action.payload.value
  } else if (action.type === UNSET_FILE) {
    draft[action.payload.name] = null
  } else if (action.type === SET_FILES) {
    draft[action.payload.name] = action.payload.value
  } else if (action.type === UNSET_FILES) {
    draft[action.payload.name] = []
  }
}
