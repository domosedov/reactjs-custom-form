import React, { useReducer, useState, useEffect } from 'react'
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
import CheckboxGroupField from './CheckboxGroupField'
import UploadFilesField from './UploadFilesField'
import Validator from './validator'

const subjects = {
  multiple: true,
  name: 'subjects',
  options: [
    { label: 'Русский язык', value: 1 },
    { label: 'Математика', value: 2 },
    { label: 'Обществознание', value: 3 },
    { label: 'История', value: 312 },
    { label: 'Компьютерная грамотность', value: 23 },
    { label: 'Английский язык', value: 643 },
    { label: 'Русский язык', value: 112 },
    { label: 'Математика', value: 232 },
    { label: 'Обществознание', value: 112433 },
    { label: 'История', value: 31243652 },
    { label: 'Компьютерная грамотность', value: 2463 },
    { label: 'Английский язык', value: 64453633 }
  ]
}

const students = {
  multiple: true,
  name: 'students',
  options: [
    { label: 'Дошкольник', value: 1 },
    { label: 'Начальная школа', value: 2 },
    { label: '2-Класс', value: 3 }
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

const statuses = {
  multiple: false,
  name: 'status',
  options: [
    { label: 'Школьный учитель', value: 3241 },
    { label: 'Частный преподаватель', value: 25345 }
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

const metroes = {
  multiple: false,
  name: 'metro',
  options: [
    { label: 'Планерная', value: 1 },
    { label: 'Сходненская', value: 2 }
  ]
}

const places = {
  multiple: true,
  name: 'places',
  options: [
    { label: 'У репетитора', value: 11 },
    { label: 'У ученика', value: 22 },
    { label: 'Дистанционно', value: 33 }
  ]
}

const reducer = (draft, action) => {
  switch (action.type) {
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
    case 'set_photo': {
      draft.photo = action.payload
      break
    }
    case 'delete_photo': {
      draft.photo = null
      break
    }
    case 'change_gender': {
      draft.gender = action.payload
      break
    }
    case 'change_dateOfBirth': {
      draft.dateOfBirth = action.payload
      break
    }
    case 'change_phone': {
      draft.phone = action.payload
      break
    }
    case 'change_email': {
      draft.email = action.payload
      break
    }
    case 'change_city': {
      draft.city = action.payload
      break
    }
    case 'change_area': {
      draft.area = action.payload
      break
    }
    case 'change_metro': {
      draft.metro = action.payload
      break
    }
    case 'change_places': {
      draft.places[action.payload] = !draft.places[action.payload]
      break
    }
    case 'change_status': {
      draft.status = action.payload
      break
    }
    case 'change_subjects': {
      draft.subjects[action.payload] = !draft.subjects[action.payload]
      break
    }
    case 'change_students': {
      draft.students[action.payload] = !draft.students[action.payload]
      break
    }
    case 'change_rate': {
      draft.rate = action.payload
      break
    }
    case 'change_experiance': {
      draft.experiance = action.payload
      break
    }
    case 'change_education': {
      draft.education = action.payload
      break
    }
    case 'change_description': {
      draft.description = action.payload
      break
    }
    case 'set_documents': {
      draft.documents = action.payload
      break
    }
    case 'empty_documents': {
      draft.documents = []
      break
    }
    case 'change_agreeOffer': {
      draft.agreeOffer = !draft.agreeOffer
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
    photo: null,
    gender: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    area: '',
    rate: '0',
    experiance: '0',
    education: '',
    description: '',
    documents: [],
    agreeOffer: false
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
  const [inputErrors, setInputErrors] = useState({})
  const [data, setData] = useState(null)
  const [state, dispatch] = useReducer(curriedReducerFunction, {}, () => {
    return generateInitialState(subjects, students, cities, metroes, genders, places, statuses)
  })

  const handleSubmit = evt => {
    evt.preventDefault()
    setInputErrors(() => ({}))

    const validate = (state) => {
      const textFields = ['name', 'lastname', 'middlename', 'education']
      const numberFields = ['gender', 'rate', 'experiance', 'city', 'metro', 'status']
      const multiSelectFields = ['subjects', 'students', 'places']

      if (!Validator.checkAgreeButton(state.agreeOffer)) {
        setInputErrors((prevState) => ({ ...prevState, agreeOffer: true }))
      }

      if (!Validator.checkEmail(state.email)) {
        setInputErrors((prevState) => ({ ...prevState, email: true }))
      }

      if (!Validator.checkPhone(state.phone)) {
        setInputErrors((prevState) => ({ ...prevState, phone: true }))
      }

      if (!Validator.checkDate(state.dateOfBirth)) {
        setInputErrors((prevState) => ({ ...prevState, dateOfBirth: true }))
      }

      for (const field of textFields) {
        if (!Validator.checkTextInput(state[field])) {
          setInputErrors((prevState) => ({ ...prevState, [field]: true }))
        }
      }
      for (const field of numberFields) {
        if (!Validator.checkNumberInput(state[field])) {
          setInputErrors((prevState) => ({ ...prevState, [field]: true }))
        }
      }
      for (const field of multiSelectFields) {
        if (!Validator.checkMultiSelectInput(state[field])) {
          setInputErrors((prevState) => ({ ...prevState, [field]: true }))
        }
      }

      if (state.description.length > 0) {
        if (!Validator.checkTextInput(state.description)) {
          setInputErrors((prevState) => ({ ...prevState, description: true }))
        }
      }

      if (state.area.length > 0) {
        if (!Validator.checkTextInput(state.area)) {
          setInputErrors((prevState) => ({ ...prevState, area: true }))
        }
      }

      if (state.photo) {
        if (!Validator.checkFileInput(state.photo)) {
          setInputErrors((prevState) => ({ ...prevState, photo: true }))
        }
      }

      if (state.documents.length) {
        for (const doc of state.documents) {
          if (!Validator.checkFileInput(doc)) {
            setInputErrors((prevState) => ({ ...prevState, documents: true }))
          }
        }
      }
    }

    validate(state)
    setData(state)
  }

  useEffect(() => {
    console.log(data)
    console.log(inputErrors)
  }, [data, inputErrors])

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <div className="bg-white rounded-lg shadow-lg mx-auto lg:w-10/12 xl:w-8/12 my-4">
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
              <FileUploadField />
            </div>
          </div>

          <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
              <RadioGroupField field={genders} label={'Пол'} required={true} />
            </div>
            <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
              <DatePickerField
                label={'Дата рождения'}
                name={'dateOfBirth'}
                required={true}
              />
            </div>
          </div>

          <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
              <SelectField
                field={cities}
                label={'Город'}
                name={'city'}
                required={true}
              />
            </div>
            <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
              <SelectField
                field={metroes}
                label={'Метро'}
                name={'metro'}
                required={true}
              />
            </div>
          </div>

          <div className="col-span-6 flex flex-col md:grid grid-cols-2 grid-rows-2 gap-4">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
              <TextField
                label={'Район'}
                name={'area'}
                type={'text'}
                required={false}
              />
            </div>
            <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
              <CheckboxGroupField
                field={places}
                label={'Занятия проводятся'}
                required={true}
              />
            </div>
          </div>

          <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
              <TextField
                label={'Телефон'}
                name={'phone'}
                type={'tel'}
                required={true}
              />
            </div>
            <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
              <TextField
                label={'Email'}
                name={'email'}
                type={'email'}
                required={true}
              />
            </div>
          </div>

          <div className="col-span-6 flex flex-col md:grid grid-cols-2 grid-rows-2 gap-4">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
              <MultiSelect
                field={subjects}
                label={'Предметы'}
                required={true}
              />
            </div>
            <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
              <MultiSelect field={students} label={'Ученики'} required={true} />
            </div>
          </div>

          <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
              <SelectField
                field={statuses}
                label={'Ваш статус'}
                name={'status'}
                required={true}
              />
            </div>
            <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
              <NumberField
                label={'Год начала деятельности'}
                min={1900}
                max={new Date().getUTCFullYear()}
                required={true}
                name={'experiance'}
              />
            </div>
          </div>

          <div className="col-span-6">
            <TextAreaField
              label={'Образование'}
              name={'education'}
              required={true}
            />
          </div>

          <div className="col-span-6">
            <UploadFilesField/>
          </div>

          <div className="col-span-6">
            <TextAreaField
              label={'Дополнительная информация'}
              name={'description'}
              required={false}
            />
          </div>

          <div className="col-span-6 grid grid-cols-4 grid-rows-2 gap-4">
            <div className="col-start-1 col-end-5 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
              <NumberField
                label={'Ваша ставка (₽/час)'}
                min={100}
                max={500000}
                step={10}
                required={true}
                name={'rate'}
              />
            </div>
            <div className="col-start-1 col-end-5 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
              <AgreeCheckboxField name={'agreeOffer'} required={true} />
            </div>
          </div>

          <div className="col-span-6">
            <button className="block mx-auto px-4 py-2 bg-indigo-600 text-white rounded duration-200 hover:bg-indigo-500 focus:outline-none focus:shadow-outline">
              Отправить
            </button>
          </div>
        </form>
      </div>
    </FormContext.Provider>
  )
}

export default Form
