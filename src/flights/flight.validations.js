const {param, query} = require('express-validator');
const validation = require('../middlewares/validation.middleware');

module.exports.getFlightValidation = () => {
    return [[
        param('route').isString(),
        query('input_file').isString(),
    ], validation]
};

module.exports.saveRouteValidation = () => {
    return [[
        param('route').isString(),
        query('input_file').isString(),
        query('price').isNumeric(),
    ], validation]
};
