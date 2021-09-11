/**
 * @description 数据验证
 */
const Ajv = require('ajv')

const ajv = new Ajv()

function validate(schema,data={}){
    const validate  = ajv.compile(schema)
    const valid = validate(data)
    if(!valid){
        return validate.errors[0] 
    }
}

module.exports = validate