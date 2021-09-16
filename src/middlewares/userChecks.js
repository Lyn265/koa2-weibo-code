const { ErrorModel } = require('../model/ResModel')
const {loginCheckFailInfo} = require('../model/ErrorInfo')
/**
 * @description API登录验证
 * @param {*} ctx 
 * @param {*} next 
 * @returns 
 */
async function loginCheck(ctx,next){
    if(ctx.session && ctx.session.userInfo){
        await next()
        return 
    }
    return new ErrorModel(loginCheckFailInfo)
}

async function loginRedirect(ctx,next){
    if(ctx.session && ctx.session.userInfo){
        await next()
        return 
    }
    const url = ctx.url
    ctx.redirect('/login?url='+ encodeURIComponent(url))
}

module.exports={
    loginCheck,
    loginRedirect
}
