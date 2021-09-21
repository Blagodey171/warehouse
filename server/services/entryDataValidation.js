const { validationResult } = require('express-validator')

const entryDataValidation = (request, response) => {
    let err = validationResult(request)
    if (!err.isEmpty()) {
        return response.status(400).json({
            ...err,
            message: 'Некорректные данные при регистрации',
        })
    }
}

module.exports = entryDataValidation