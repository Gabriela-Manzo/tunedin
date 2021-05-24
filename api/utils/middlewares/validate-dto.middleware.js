const Joi = require('joi')

const validateDTO = (type, params, options = {}) => {

    return (req, res, next) => {
        
        const schema = Joi.object().keys(params);
        const result = schema.validate(req[type], {
            allowUnknown: false,
            ...options
            });
    
        if(result.error) {
            const mensagens = result.error.details.reduce((acc, item) => {
                return [
                    ...acc, item.message
                ]
            }, []);

            return res.status(400).send({
                sucesso: false,
                detalhes: [
                    ...mensagens
                ]
            })
        }
        return next();
    }
}

module.exports = validateDTO
