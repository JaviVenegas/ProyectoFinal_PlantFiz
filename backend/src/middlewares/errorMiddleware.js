const errors = require('../helpers/errorsMessages')

const errorMiddleware = (err, req, res, next) => {
    console.error("Error recibido en middleware:", err);
   
    const errorDetails = errors[err.message] || errors['SERVER_ERROR'];
    
    const response = {
        id: errorDetails.id,
        message: errorDetails.message,
        description: errorDetails.description
    }

    res.status(errorDetails.statusCode).json(response)

}

module.exports = errorMiddleware