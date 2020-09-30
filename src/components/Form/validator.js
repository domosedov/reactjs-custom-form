export default class Validator {
  static checkEmail (email) {
    if (typeof email !== 'string') {
      return false
    }
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email.trim()).toLowerCase())
  }

  static checkPhone (phone) {
    if (typeof phone !== 'string') {
      return false
    }
    if (phone.trim().length <= 0) return false
    // eslint-disable-next-line no-useless-escape
    const re = /^((8|\+\d|7)[\- ]*)*(\(?\d*\)*[\-]?)*[\d\- ]*$/
    return re.test(String(phone.trim()).toLowerCase())
  }

  static checkDate (date) {
    if (typeof date !== 'string') return false
    if (date.trim().length <= 0) return false

    const regExp = /\d\d\d\d-\d\d-\d\d/
    return regExp.test(date)
  }

  static checkTextInput (text) {
    if (typeof text !== 'string') {
      return false
    }
    if (text.trim().length <= 0) {
      return false
    }
    return true
  }

  static checkNumberInput (num) {
    if (typeof num !== 'string') return false
    if (num.length <= 0) return false
    const number = Number(num.trim())
    if (isNaN(number)) return false
    if (number <= 0) return false
    return true
  }

  static checkMultiSelectInput (option) {
    if (typeof option !== 'object') return false
    if (Object.is(option, null)) return false
    if (Object.keys(option).length <= 0) return false
    const keys = Object.keys(option)

    if (keys.some(k => {
      return isNaN(Number(k))
    })) {
      return false
    }

    const values = Object.values(option)
    if (values.some(v => typeof v !== 'boolean')) return false
    if (values.every(v => v === false)) return false

    return true
  }

  static checkAgreeButton (value) {
    if (typeof value !== 'boolean') return false
    return value
  }

  static checkFileInput (file) {
    if (!file) return false
    if (!(file instanceof File)) return false
    if (file.size > 5000000) return false

    const accepted = ['image/jpg', 'image/jpeg', 'image/png']

    return accepted.includes(file.type)
  }
}
