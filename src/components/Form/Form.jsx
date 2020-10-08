import React, { useReducer, useState, useEffect, useCallback } from 'react'
import produce from 'immer'
import { FormDispatchContext, FormStateContext } from './context'
import MultiSelectField from './fields/MultiSelect/MultiSelectField'
import TextField from './fields/TextField'
import DatePickerField from './fields/DatePickerField'
import TextAreaField from './fields/TextAreaField'
import NumberField from './fields/NumberField'
import RadioGroupField from './fields/RadioGroup/RadioGroupField'
import SelectField from './fields/Select/SelectField'
import AgreeCheckboxField from './fields/AgreeCheckboxField'
import FileUploadField from './fields/FileUploadField'
import CheckboxGroupField from './fields/CheckboxGroup/CheckboxGroupField'
import MultipleFilesUploadField from './fields/MultipleFilesUploadField'
import Validator from './validator'
import { computeInitialErrors, computeInitialState, immerReducer } from './reducer'
import ValidationErrors from './ValidationErrors'

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
  placeholder: 'Введите имя',
  errorMessage: 'Поле не может быть пустым.'
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
  placeholder: 'Введите отчество',
  errorMessage: 'Поле не может быть пустым.'
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
  placeholder: 'Введите фамилию',
  errorMessage: 'Поле не может быть пустым.'
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
  placeholder: '',
  errorMessage: 'Допускаются файлы jpeg, png. Масимальный размер - 5Мб'
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
  placeholder: '',
  errorMessage: 'Необходимо выбрать пол.'
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
  placeholder: 'Дата в формате 2000-12-31',
  errorMessage: 'Необходимо указать корректную дату.'
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
  placeholder: '',
  errorMessage: 'Необходимо выбрать город.'
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
  placeholder: '',
  errorMessage: 'Необходимо выбрать метро.'
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
  placeholder: '',
  errorMessage: 'Необходимо выбрать хотя бы одно место.'
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
  placeholder: 'Например Куркино',
  errorMessage: 'Поле не может быть пустым.'
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
  placeholder: 'Например +7 999 999 99 99',
  errorMessage: 'Необходимо ввести корректный номер телефона.'
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
  placeholder: 'Например example@mail.com',
  errorMessage: 'Необходимо ввести корректную почту.'
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
  placeholder: '',
  errorMessage: 'Необходимо выбрать минимум один предмет.'
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
  placeholder: '',
  errorMessage: 'Необходимо выбрать минимум одну категорию.'
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
  placeholder: '',
  errorMessage: 'Необходимо указать статус.'
}

const experianceField = {
  name: 'experiance',
  label: 'Ваш стаж (с какого года работаете)',
  multiple: false,
  type: 'number',
  valueType: 'string',
  required: true,
  options: null,
  defaultValue: '',
  placeholder: 'Введит год начала деятельности',
  errorMessage: 'Необходимо ввести год начала деятельности для корректного рассчета стажа.'
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
  placeholder:
    'Укажите какие учебные заведения, факультеты и в каком году вы заканчилвали, а также продолжительность учебы в этих заведениях.',
  errorMessage: 'Поле не может быть пустым.'
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
  placeholder: 'Здесь вы можете указать любую дополнительную информацию.',
  errorMessage: 'Поле не может быть пустым.'
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
  placeholder: 'Укажите стоимость',
  errorMessage: 'Поле не может быть пустым.'
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
  placeholder: '',
  errorMessage: 'Допускаются файлы jpeg, png. Масимальный размер - 5Мб.'
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
  placeholder: '',
  errorMessage: 'Необходимо согласие.'
}

const Form = () => {
  const [inputErrors, setInputErrors] = useState(({}))
  const [errorMessages] = useState(() => computeInitialErrors(lastnameField,
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
    educationField,
    rateField,
    documentsField,
    agreeOfferField))
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
      educationField,
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

      const errors = {}

      if (!Validator.checkAgreeButton(state.agreeOffer)) {
        errors.agreeOffer = true
      }

      if (!Validator.checkEmail(state.email)) {
        errors.email = true
      }

      if (!Validator.checkPhone(state.phone)) {
        errors.phone = true
      }

      if (!Validator.checkDate(state.dateOfBirth)) {
        errors.dateOfBirth = true
      }

      for (const field of textFields) {
        if (!Validator.checkTextInput(state[field])) {
          errors[field] = true
        }
      }
      for (const field of numberFields) {
        if (!Validator.checkNumberInput(state[field])) {
          errors[field] = true
        }
      }
      for (const field of multiSelectFields) {
        if (!Validator.checkMultiSelectInput(state[field])) {
          errors[field] = true
        }
      }

      if (state.description.length > 0) {
        if (!Validator.checkTextInput(state.description)) {
          errors.description = true
        }
      }

      if (state.area.length > 0) {
        if (!Validator.checkTextInput(state.area)) {
          errors.area = true
        }
      }

      if (state.photo) {
        if (!Validator.checkFileInput(state.photo)) {
          errors.photo = true
        }
      }

      if (state.documents.length) {
        for (const doc of state.documents) {
          if (!Validator.checkFileInput(doc)) {
            errors.documents = true
          }
        }
      }

      return errors
    }

    const errors = validate(state)

    if (Object.keys(errors).length > 0) {
      setInputErrors(() => errors)
    } else {
      setInputErrors(() => ({}))
      setData(state)
    }
  }

  const handleFocus = useCallback(
    (evt) => {
      if (Object.prototype.hasOwnProperty.call(inputErrors, evt.target.name)) {
        const { name } = evt.target
        setInputErrors((prevState) => ({ ...prevState, [name]: false }))
      }
    },
    [inputErrors]
  )

  const handleFocusCustom = useCallback(
    (name) => {
      if (Object.prototype.hasOwnProperty.call(inputErrors, name)) {
        setInputErrors((prevState) => ({ ...prevState, [name]: false }))
      }
    },
    [inputErrors]
  )

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
          {Object.values(inputErrors).some((v) => v === true) && (
            <ValidationErrors
              messages={errorMessages}
              inputErrors={inputErrors}
            />
          )}
          <form
            className="rounded-b-lg px-4 py-4 grid grid-cols-6"
            onSubmit={handleSubmit}
          >
            <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
              <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-end-2 md:row-end-3">
                <TextField
                  label={lastnameField.label}
                  name={lastnameField.name}
                  required={lastnameField.required}
                  currentValue={state[lastnameField.name]}
                  isInvalid={inputErrors[lastnameField.name]}
                  handleFocus={handleFocus}
                  placeholder={lastnameField.placeholder}
                />
                <TextField
                  label={nameField.label}
                  name={nameField.name}
                  required={nameField.required}
                  currentValue={state[nameField.name]}
                  isInvalid={inputErrors[nameField.name]}
                  handleFocus={handleFocus}
                  placeholder={nameField.placeholder}
                />
                <TextField
                  label={middlenameField.label}
                  name={middlenameField.name}
                  required={middlenameField.required}
                  currentValue={state[middlenameField.name]}
                  isInvalid={inputErrors[middlenameField.name]}
                  handleFocus={handleFocus}
                  placeholder={middlenameField.placeholder}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <FileUploadField
                  label={photoField.label}
                  name={photoField.name}
                  required={photoField.required}
                  currentValue={state[photoField.name]}
                  isInvalid={inputErrors[photoField.name]}
                  handleFocus={handleFocusCustom}
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
                  isInvalid={inputErrors[genderField.name]}
                  handleFocus={handleFocusCustom}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <DatePickerField
                  label={dateField.label}
                  name={dateField.name}
                  required={dateField.required}
                  currentValue={state[dateField.name]}
                  placeholder={dateField.placeholder}
                  isInvalid={inputErrors[dateField.name]}
                  handleFocus={handleFocus}
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
                  isInvalid={inputErrors[cityField.name]}
                  handleFocus={handleFocus}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <SelectField
                  options={metroField.options}
                  label={metroField.label}
                  name={metroField.name}
                  required={metroField.required}
                  currentValue={state[metroField.name]}
                  isInvalid={inputErrors[metroField.name]}
                  handleFocus={handleFocus}
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
                  isInvalid={inputErrors[areaField.name]}
                  handleFocus={handleFocus}
                  placeholder={areaField.placeholder}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <CheckboxGroupField
                  options={placesField.options}
                  label={placesField.label}
                  name={placesField.name}
                  required={placesField.required}
                  currentValue={state[placesField.name]}
                  isInvalid={inputErrors[placesField.name]}
                  handleFocus={handleFocusCustom}
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
                  isInvalid={inputErrors[phoneField.name]}
                  handleFocus={handleFocus}
                  placeholder={phoneField.placeholder}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <TextField
                  label={emailField.label}
                  name={emailField.name}
                  required={emailField.required}
                  currentValue={state[emailField.name]}
                  isInvalid={inputErrors[emailField.name]}
                  handleFocus={handleFocus}
                  placeholder={emailField.placeholder}
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
                  isInvalid={inputErrors[subjectsField.name]}
                  handleFocus={handleFocusCustom}
                />
              </div>
              <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <MultiSelectField
                  options={studentsField.options}
                  label={studentsField.label}
                  name={studentsField.name}
                  required={studentsField.required}
                  currentValue={state[studentsField.name]}
                  isInvalid={inputErrors[studentsField.name]}
                  handleFocus={handleFocusCustom}
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
                  isInvalid={inputErrors[statusField.name]}
                  handleFocus={handleFocus}
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
                  isInvalid={inputErrors[experianceField.name]}
                  handleFocus={handleFocus}
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
                isInvalid={inputErrors[educationField.name]}
                handleFocus={handleFocus}
              />
            </div>
            <div className="col-span-6">
              <MultipleFilesUploadField
                label={documentsField.label}
                name={documentsField.name}
                required={documentsField.required}
                currentValue={state[documentsField.name]}
                isInvalid={inputErrors[documentsField.name]}
              />
            </div>
            <div className="col-span-6">
              <TextAreaField
                label={descriptionField.label}
                name={descriptionField.name}
                required={descriptionField.required}
                currentValue={state[descriptionField.name]}
                placeholder={descriptionField.placeholder}
                isInvalid={inputErrors[descriptionField.name]}
                handleFocus={handleFocus}
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
                  isInvalid={inputErrors[rateField.name]}
                  handleFocus={handleFocus}
                />
              </div>
              <div className="col-start-1 col-end-5 row-start-2 row-end-3 md:col-start-2 md:row-start-1">
                <AgreeCheckboxField
                  name={agreeOfferField.name}
                  required={agreeOfferField.required}
                  currentValue={state[agreeOfferField.name]}
                  isInvalid={inputErrors[agreeOfferField.name]}
                  handleFocus={handleFocusCustom}
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
