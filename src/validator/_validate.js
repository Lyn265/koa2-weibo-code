/**
 * @description 数据验证
 */
const Ajv = require('ajv')

const ajv = new Ajv()

function validate(schema,data={}){
    const _validate  = ajv.compile(schema)
    const valid = _validate(data)
    if(!valid){
        return _validate.errors[0] 
    }
}

module.exports = validate