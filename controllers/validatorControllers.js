const joi = require('joi')
const validatorControllers ={
    validatorSignUp : (req, res, next) =>{
        const schema = joi.object({
            firstName: joi.string().trim(false).min(2).max(35).pattern(new RegExp('[^0-9]+$')).required().messages({
                "string.max": "Se permite un máximo de 35 caracteres",
                "string.min": "Se requiere un mínimo de 2 caracteres",
                "string.trim": "No se permiten espacios antes y despues del nombre",
                "string.pattern.base": "El nombre no es valido"
            }),
            lastName: joi.string().trim().min(2).max(35).pattern(new RegExp('[^0-9]+$')).required().messages({
                "string.max": "Se permite un maximo de 35 caracteres",
                "string.min": "Se requiere un mínimo de 2 caracteres",
                "string.trim": "No se permiten espacios antes y despues del apellido",
                "string.pattern.base": "El apellido no es valido"
            }),
            eMail: joi.string().trim().min(6).max(255).email().required().messages({
                "string.max": "Se permite un maximo de 255 caracteres",
                "string.min": "Se requiere un mínimo de 6 caracteres",
                "string.trim": "No se permiten espacios antes y despues del email",
                "string.email": "Se debe ingresar un email valido"
            }),
            password: joi.string().trim().min(4).max(255).required().messages({
                "string.max": "Se permite un maximo de 255 caracteres",
                "string.min": "Se requiere un mínimo de 4 caracteres",
                "string.trim": "No se permiten espacios antes y despues de la contraseña",
            }), // probar si alphanum, o alguna pattern
            photoURL: joi.string().trim().min(6).max(2048).required().messages({
                "string.max": "Se permite un maximo de 2048 caracteres",
                "string.min": "Se requiere un mínimo de 6 caracteres",
                "string.trim": "No se permiten espacios antes y despues de la imagen"
            }),
            google: joi.boolean(),
            facebook: joi.boolean()
        })
        //.pattern(/\p{L}+$/u)
        const validation = schema.validate(req.body, {abortEarly: false})
        if(!validation.error){
            next()
        }else{ // ver como manejar errores en front
            res.json({success: false, error: validation.error.details})
        }
    },
    validatorPasswordChange : (req, res, next) =>{
        const schema = joi.object({
            password: joi.string().trim().min(4).max(255).required(),
        })
        const validation = schema.validate(req.body, {abortEarly: false})
        if(!validation.error){
            next()
        }else{ // ver como manejar errores en front
            let validationStringified = validation.error.details.map(element => element.message).join(' ')
            res.json({success: false, response: validationStringified})
        }
    },
    validatorPasswordResetEmailSend : (req, res, next)=>{
        const schema = joi.object({
            eMail: joi.string().trim().min(6).max(255).email().required(),
        })
        const validation = schema.validate(req.body, {abortEarly: false})
        if(!validation.error){
            next()
        }else{ // ver como manejar errores en front
            let validationStringified = validation.error.details.map(element => element.message).join(' ')
            res.json({success: false, response: validationStringified})
        }
    }
}
module.exports = validatorControllers  // revisar