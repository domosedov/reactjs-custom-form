import Validator from './validator'

describe('Проверка валидатора', () => {
  test('Email', () => {
    expect(Validator.checkEmail('ru.grigory@gmail.com')).toBe(true)
    expect(Validator.checkEmail('234sdfsdf ')).toBe(false)
    expect(Validator.checkEmail('234sdfsdf@asd.ds')).toBe(true)
    expect(Validator.checkEmail('a@m')).toBe(false)
    expect(Validator.checkEmail('a@m.ws')).toBe(true)
    expect(Validator.checkEmail('  a@m.ws  ')).toBe(true)
    expect(Validator.checkEmail('  a @m.ws  ')).toBe(false)
    expect(Validator.checkEmail('asd.sad@asd.sd')).toBe(true)
    expect(Validator.checkEmail('sd.asd.sad@asd.sd')).toBe(true)
    expect(Validator.checkEmail(1)).toBe(false)
    expect(Validator.checkEmail('')).toBe(false)
  })

  test('Text Input', () => {
    expect(Validator.checkTextInput('')).toBe(false)
    expect(Validator.checkTextInput('Alex')).toBe(true)
    expect(Validator.checkTextInput('A')).toBe(true)
    expect(Validator.checkTextInput('    ')).toBe(false)
  })

  test('Number Input', () => {
    expect(Validator.checkNumberInput('')).toBe(false)
    expect(Validator.checkNumberInput(NaN)).toBe(false)
    expect(Validator.checkNumberInput('12ad')).toBe(false)
    expect(Validator.checkNumberInput('as12')).toBe(false)
    expect(Validator.checkNumberInput('1')).toBe(true)
    expect(Validator.checkNumberInput('0')).toBe(false)
  })

  test('MultiSelect Input', () => {
    expect(Validator.checkMultiSelectInput(null)).toBe(false)
    expect(Validator.checkMultiSelectInput({ 1: false, 2: 'asd', 3: false, '12ds': false })).toBe(false)
    expect(Validator.checkMultiSelectInput({ 1: false, 2: false, 3: false, '12ds': false })).toBe(false)
    expect(Validator.checkMultiSelectInput({ 1: false, 2: false, 3: false, '12ds': true })).toBe(false)
    expect(Validator.checkMultiSelectInput({ 1: false, 2: false, 3: false, 4: true })).toBe(true)
    expect(Validator.checkMultiSelectInput('asd')).toBe(false)
  })

  test('AgreeButton', () => {
    expect(Validator.checkAgreeButton(false)).toBe(false)
    expect(Validator.checkAgreeButton('')).toBe(false)
    expect(Validator.checkAgreeButton(undefined)).toBe(false)
    expect(Validator.checkAgreeButton()).toBe(false)
    expect(Validator.checkAgreeButton(true)).toBe(true)
  })

  test('File Input', () => {
    const parts = [
      new Blob(['you construct a file...'], { type: 'image/jpg' }),
      ' Same way as you do with blob',
      new Uint16Array([33])
    ]

    // Construct a file
    const file1 = new File(parts, 'sample.txt', {
      lastModified: new Date(0),
      type: 'image/jpg'
    })

    const file2 = new File(parts, 'sample.txt', {
      lastModified: new Date(0),
      type: 'image/gif'
    })

    expect(Validator.checkFileInput(null)).toBe(false)
    expect(Validator.checkFileInput(false)).toBe(false)
    expect(Validator.checkFileInput()).toBe(false)
    expect(Validator.checkFileInput([])).toBe(false)
    expect(Validator.checkFileInput({})).toBe(false)
    expect(Validator.checkFileInput(file1)).toBe(true)
    expect(Validator.checkFileInput(file2)).toBe(false)
  })
})
