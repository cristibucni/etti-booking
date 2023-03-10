const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is not valid'
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6'
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}
