/**
 * @description json schema 验证中间件
 * 
 */

const { ErrorModel } = require('../model/ResModel')
const {jsonSchemaFileInfo} = require('../model/ErrorInfo')
/**
 * 
 * @param {函数} validateFn 验证函数
 * @returns 
 */
function genValidator(validateFn){
    async function valdator(ctx,next){
        const data = ctx.request.body
        const error = validateFn(data)
        if(error){
            //验证失败
            ctx.body =  new ErrorModel(jsonSchemaFileInfo)
            return
        }
        //验证成功
        await next()
    }
    return valdator
}
module.exports= {
    genValidator
}