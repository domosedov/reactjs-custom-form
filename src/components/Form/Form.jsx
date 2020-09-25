import React, { useReducer } from 'react'
import produce from 'immer'
import { FormContext } from './context'
import MultiSelect from './MultiSelect'
import TextField from './TextField'
import DatePickerField from './DatePickerField'
import TextAreaField from './TextAreaField'
import NumberField from './NumberField'
import RadioGroupField from './RadioGroupField'
import SelectField from './SelectField'
import AgreeCheckboxField from './AgreeCheckboxField'
import FileUploadField from './FileUploadField'

const subjects = {
  multiple: true,
  name: 'subjects',
  options: [
    { label: 'Русский язык', value: 1 },
    { label: 'Математика', value: 2 },
    { label: 'Обществознание', value: 3 }
  ]
}

const cities = {
  multiple: false,
  name: 'city',
  options: [
    { label: 'Москва', value: 1 },
    { label: 'Химки', value: 2 }
  ]
}

const genders = {
  multiple: false,
  name: 'gender',
  options: [
    { label: 'Мужской', value: 32 },
    { label: 'Женский', value: 35 }
  ]
}

const reducer = (draft, action) => {
  switch (action.type) {
    case 'change_subjects': {
      draft.subjects[action.payload] = !draft.subjects[action.payload]
      break
    }
    case 'change_lastname': {
      draft.lastname = action.payload
      break
    }
    case 'change_name': {
      draft.name = action.payload
      break
    }
    case 'change_middlename': {
      draft.middlename = action.payload
      break
    }
    case 'change_dateOfBirth': {
      draft.dateOfBirth = action.payload
      break
    }
    case 'change_education': {
      draft.education = action.payload
      break
    }
    case 'change_experiance': {
      draft.experiance = action.payload
      break
    }
    case 'change_gender': {
      draft.gender = action.payload
      break
    }
    case 'change_city': {
      draft.city = action.payload
      break
    }
    case 'change_agreeOffer': {
      draft.agreeOffer = !draft.agreeOffer
      break
    }
    case 'set_photo': {
      draft.photo = action.payload
      break
    }
    case 'delete_photo': {
      draft.photo = null
      break
    }
  }
}

const curriedReducerFunction = produce(reducer)

const generateInitialState = (...selectOptions) => {
  const initialState = {
    lastname: '',
    name: '',
    middlename: '',
    dateOfBirth: '',
    education: '',
    experiance: 0,
    agreeOffer: false,
    photo: null
  }

  if (selectOptions.length) {
    for (const select of selectOptions) {
      if (select.multiple) {
        initialState[select.name] = {}
        for (const option of select.options) {
          initialState[select.name][option.value] = false
        }
      } else {
        initialState[select.name] = ''
      }
    }
  }

  return initialState
}

const Form = () => {
  const [state, dispatch] = useReducer(curriedReducerFunction, {}, () => {
    return generateInitialState(subjects, cities, genders)
  })

  const handleSubmit = evt => {
    evt.preventDefault()

    console.log(state)
  }

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <div className="bg-white rounded-lg shadow-lg mx-auto lg:w-10/12 xl:w-8/12">
        <h1 className="bg-indigo-600 uppercase tracking-tight text-gray-100 font-semibold text-2xl text-center px-4 py-4 rounded-t-lg">
          Создать профиль репетитора
        </h1>
        <form
          className="rounded-b-lg px-4 py-4 grid grid-cols-6"
          onSubmit={handleSubmit}
        >
          <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
              <TextField label={'Фамилия'} name={'lastname'} required={true} />
              <TextField label={'Имя'} name={'name'} required={true} />
              <TextField
                label={'Отчество'}
                name={'middlename'}
                required={true}
              />
            </div>
            <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
              <FileUploadField/>
            </div>
          </div>

          <NumberField
            label={'Стаж'}
            min={1900}
            max={new Date().getUTCFullYear()}
            required={true}
            name={'experiance'}
          />
          <TextAreaField
            label={'Образование'}
            name={'education'}
            required={true}
          />
          <DatePickerField
            label={'Дата рождения'}
            name={'dateOfBirth'}
            required={true}
          />
          <RadioGroupField field={genders} />
          <SelectField field={cities} />
          <AgreeCheckboxField
            label={'Согласен'}
            name={'agreeOffer'}
            required={true}
          />
          <MultiSelect field={subjects} />
          <button className="px-2 py-1 bg-blue-700 text-white rounded">
            Submit
          </button>
          <input type="file" className="bg-green-200"/>
        </form>
      </div>
    </FormContext.Provider>
  )
}

export default Form