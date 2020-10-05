import React, { useReducer, useState, useEffect } from 'react'
import produce from 'immer'
import { FormDispatchContext, FormStateContext } from './context'
import MultiSelectField from './MultiSelectField'
import TextField from './TextField'
import DatePickerField from './DatePickerField'
import TextAreaField from './TextAreaField'
import NumberField from './NumberField'
import RadioGroupField from './RadioGroupField'
import SelectField from './SelectField'
import AgreeCheckboxField from './AgreeCheckboxField'
import FileUploadField from './FileUploadField'
import CheckboxGroupField from './CheckboxGroupField'
import MultipleFilesUploadField from './MultipleFilesUploadField'
import Validator from './validator'
import { computeInitialState, immerReducer } from './reducer'

const curriedReducerFunction = produce(immerReducer)

const nameField = {
  name: 'name',
  label: 'Имя',
  multiple: false,
  type: 'text',
  valueType: 'text',
  required: true,
  options: null,
  defaultValue: '',
  placeholder: ''
}

const middlenameField = {
  name: 'middlename',
  label: 'Отчество',
  multiple: false,
  type: 'text',
  valueType: 'text',
  required: true,
  options: null,
  defaultValue: '',
  placeholder: ''
}

const lastnameField = {
  name: 'lastname',
  label: 'Фамилия',
  multiple: false,
  type: 'text',
  valueType: 'text',
  required: true,
  options: null,
  defaultValue: '',
  placeholder: ''
}

const photoField = {
  name: 'photo',
  label: 'Фото',
  multiple: false,
  type: 'file',
  valueType: 'object',
  required: false,
  options: null,
  defaultValue: null,
  placeholder: ''
}

const genderField = {
  name: 'gender',
  label: 'Пол',
  multiple: false,
  type: 'text',
  valueType: 'string',
  required: true,
  options: [
    { title: 'Мужской', value: '124145' },
    { title: 'Женский', value: '1223' }
  ],
  defaultValue: '',
  placeholder: ''
}

const dateField = {
  name: 'dateOfBirth',
  label: 'Дата рождения',
  multiple: false,
  type: 'date',
  valueType: 'string',
  required: true,
  options: null,
  defaultValue: '',
  placeholder: 'Дата в формате 2000-12-31'
}

const cityField = {
  name: 'city',
  label: 'Город',
  multiple: false,
  type: 'select',
  valueType: 'string',
  required: true,
  options: [
    { title: 'Москва', value: '12423145' },
    { title: 'Химки', value: '1223123' }
  ],
  defaultValue: '',
  placeholder: ''
}

const metroField = {
  name: 'metro',
  label: 'Метро',
  multiple: false,
  type: 'select',
  valueType: 'string',
  required: true,
  options: [
    { title: 'Планерная', value: '124146565' },
    { title: 'Спартак', value: '1223423' }
  ],
  defaultValue: '',
  placeholder: ''
}

const placesField = {
  name: 'places',
  label: 'Занятия проводятся',
  multiple: true,
  type: 'multiselect',
  valueType: 'object',
  required: true,
  options: [
    { title: 'У репетитора', value: '124145' },
    { title: 'У ученика', value: '1223' },
    { title: 'Дистанционно', value: '122345523' }
  ],
  defaultValue: {},
  placeholder: ''
}

const areaField = {
  name: 'area',
  label: 'Район',
  multiple: false,
  type: 'text',
  valueType: 'text',
  required: false,
  options: null,
  defaultValue: '',
  placeholder: ''
}

const phoneField = {
  name: 'phone',
  label: 'Телефон',
  multiple: false,
  type: 'text',
  valueType: 'text',
  required: true,
  options: null,
  defaultValue: '',
  placeholder: ''
}

const emailField = {
  name: 'email',
  label: 'Email',
  multiple: false,
  type: 'text',
  valueType: 'text',
  required: true,
  options: null,
  defaultValue: '',
  placeholder: ''
}

const subjectsField = {
  name: 'subjects',
  label: 'Предметы',
  multiple: true,
  type: 'multiselect',
  valueType: 'object',
  required: true,
  options: [
    { title: 'Русский язык', value: '124145' },
    { title: 'Математика', value: '1223' },
    { title: 'История', value: '122345523' }
  ],
  defaultValue: {},
  placeholder: ''
}

const studentsField = {
  name: 'students',
  label: 'Категории учеников',
  multiple: true,
  type: 'multiselect',
  valueType: 'object',
  required: true,
  options: [
    { title: 'Дошкольники', value: '124145' },
    { title: 'Маладшие классы', value: '1223' },
    { title: 'Старшие классы', value: '122345523' }
  ],
  defaultValue: {},
  placeholder: ''
}

const statusField = {
  name: 'status',
  label: 'Ваш статус',
  multiple: false,
  type: 'select',
  valueType: 'string',
  required: true,
  options: [
    { title: 'Частный преподаватель', value: '124146565' },
    { title: 'Школьный учитель', value: '1223423' }
  ],
  defaultValue: '',
  placeholder: ''
}

const experianceField = {
  name: 'experiance',
  label: 'Ваш стаж',
  multiple: false,
  type: 'number',
  valueType: 'string',
  required: true,
  options: null,
  defaultValue: '',
  placeholder: 'Введит год начала деятельности'
}

const educationField = {
  name: 'education',
  label: 'Образование',
  multiple: false,
  type: 'text',
  valueType: 'text',
  required: true,
  options: null,
  defaultValue: '',
  placeholder: 'Укажите где учились'
}

const descriptionField = {
  name: 'description',
  label: 'Дополнительно',
  multiple: false,
  type: 'text',
  valueType: 'text',
  required: false,
  options: null,
  defaultValue: '',
  placeholder: 'Укажите где учились'
}

const rateField = {
  name: 'rate',
  label: 'Ваша ставка (₽/час)',
  multiple: false,
  type: 'number',
  valueType: 'string',
  required: true,
  options: null,
  defaultValue: '',
  placeholder: 'Укажите стоимость'
}

const documentsField = {
  name: 'documents',
  label: 'Документы',
  multiple: false,
  type: 'files',
  valueType: 'array',
  required: false,
  options: null,
  defaultValue: [],
  placeholder: ''
}

const agreeOfferField = {
  name: 'agreeOffer',
  label: 'Согласие',
  multiple: false,
  type: 'agreeButton',
  valueType: 'array',
  required: true,
  options: null,
  defaultValue: false,
  placeholder: ''
}

const Form = () => {
  const [inputErrors, setInputErrors] = useState({})
  const [data, setData] = useState(null)
  const [state, dispatch] = useReducer(curriedReducerFunction, {}, () => {
    return computeInitialState(
      lastnameField,
      nameField,
      middlenameField,
      genderField,
      dateField,
      cityField,
      metroField,
      placesField,
      areaField,
      phoneField,
      emailField,
      subjectsField,
      studentsField,
      statusField,
      experianceField,
      descriptionField,
      rateField,
      documentsField,
      agreeOfferField
    )
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
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
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
                <TextField
                  label={nameField.label}
                  name={nameField.name}
                  required={nameField.required}
                  currentValue={state[nameField.name]}
                />
                <TextField
                  label={lastnameField.label}
                  name={lastnameField.name}
                  required={lastnameField.required}
                  currentValue={state[lastnameField.name]}
                />
                <TextField
                  label={middlenameField.label}
                  name={middlenameField.name}
                  required={middlenameField.required}
                  currentValue={state[middlenameField.name]}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <FileUploadField
                  label={photoField.label}
                  name={photoField.name}
                  required={photoField.required}
                  currentValue={state[photoField.name]}
                />
              </div>
            </div>
            <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
              <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
                <RadioGroupField
                  options={genderField.options}
                  label={genderField.label}
                  name={genderField.name}
                  required={genderField.required}
                  currentValue={state[genderField.name]}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <DatePickerField
                  label={dateField.label}
                  name={dateField.name}
                  required={dateField.required}
                  currentValue={state[dateField.name]}
                  placeholder={dateField.placeholder}
                />
              </div>
            </div>
            <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
              <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
                <SelectField
                  options={cityField.options}
                  label={cityField.label}
                  name={cityField.name}
                  required={cityField.required}
                  currentValue={state[cityField.name]}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <SelectField
                  options={metroField.options}
                  label={metroField.label}
                  name={metroField.name}
                  required={metroField.required}
                  currentValue={state[metroField.name]}
                />
              </div>
            </div>
            <div className="col-span-6 flex flex-col md:grid grid-cols-2 grid-rows-2 gap-4">
              <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
                <TextField
                  label={areaField.label}
                  name={areaField.name}
                  required={areaField.required}
                  currentValue={state[areaField.name]}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <CheckboxGroupField
                  options={placesField.options}
                  label={placesField.label}
                  name={placesField.name}
                  required={placesField.required}
                  currentValue={state[placesField.name]}
                />
              </div>
            </div>
            <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
              <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
                <TextField
                  label={phoneField.label}
                  name={phoneField.name}
                  required={phoneField.required}
                  currentValue={state[phoneField.name]}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <TextField
                  label={emailField.label}
                  name={emailField.name}
                  required={emailField.required}
                  currentValue={state[emailField.name]}
                />
              </div>
            </div>
            <div className="col-span-6 flex flex-col md:grid grid-cols-2 grid-rows-2 gap-4">
              <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
                <MultiSelectField
                  options={subjectsField.options}
                  label={subjectsField.label}
                  name={subjectsField.name}
                  required={subjectsField.required}
                  currentValue={state[subjectsField.name]}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <MultiSelectField
                  options={studentsField.options}
                  label={studentsField.label}
                  name={studentsField.name}
                  required={studentsField.required}
                  currentValue={state[studentsField.name]}
                />
              </div>
            </div>
            <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
              <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
                <SelectField
                  options={statusField.options}
                  label={statusField.label}
                  name={statusField.name}
                  required={statusField.required}
                  currentValue={state[statusField.name]}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <NumberField
                  label={experianceField.label}
                  name={experianceField.name}
                  required={experianceField.required}
                  placeholder={experianceField.placeholder}
                  currentValue={state[experianceField.name]}
                  min={1900}
                  max={new Date().getFullYear()}
                />
              </div>
            </div>
            <div className="col-span-6">
              <TextAreaField
                label={educationField.label}
                name={educationField.name}
                required={educationField.required}
                currentValue={state[educationField.name]}
                placeholder={educationField.placeholder}
              />
            </div>
            <div className="col-span-6">
              <MultipleFilesUploadField
                label={documentsField.label}
                name={documentsField.name}
                required={documentsField.required}
                currentValue={state[documentsField.name]}
              />
            </div>
            <div className="col-span-6">
              <TextAreaField
                label={descriptionField.label}
                name={descriptionField.name}
                required={descriptionField.required}
                currentValue={state[descriptionField.name]}
                placeholder={descriptionField.placeholder}
              />
            </div>

            <div className="col-span-6 grid grid-cols-4 grid-rows-2 gap-4">
              <div className="col-start-1 col-end-5 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
                <NumberField
                  label={rateField.label}
                  name={rateField.name}
                  required={rateField.required}
                  placeholder={rateField.placeholder}
                  currentValue={state[rateField.name]}
                  min={100}
                  max={1000000}
                />
              </div>
              <div className="col-start-1 col-end-5 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <AgreeCheckboxField
                  name={agreeOfferField.name}
                  required={agreeOfferField.required}
                  currentValue={state[agreeOfferField.name]}
                />
              </div>
            </div>
            <div className="col-span-6">
              <button className="block mx-auto px-4 py-2 bg-indigo-600 text-white rounded duration-200 hover:bg-indigo-500 focus:outline-none focus:shadow-outline">
                Отправить
              </button>
            </div>
          </form>
        </div>
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  )
}

export default Form
