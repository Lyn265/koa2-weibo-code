/**
 * @description user API路由
 */
const router = require('koa-router')()

const {isExist,register,login,deleteCurUser,changeInfo,changePassword,logout} = require('../../controller/user')
const { loginCheck } = require('../../middlewares/userChecks')
const {genValidator} = require('../../middlewares/validator')
const { loginCheckFailInfo } = require('../../model/ErrorInfo')
const userValidate = require('../../validator/user')
router.prefix('/api/user')

router.post('/register',genValidator(userValidate),async(ctx,next) =>{
    const {userName,password,gender} = ctx.request.body
    //调controller
    ctx.body = await register({userName,password,gender})
})
router.post('/login',async(ctx,next) =>{
    const {userName,password} = ctx.request.body
    ctx.body = await login({ctx,userName,password})
})
router.post('/isExist',async(ctx,next) =>{
    const {userName} = ctx.request.body
    ctx.body= await isExist(userName)
})
router.post('/delete',async(ctx,next) =>{
    const {userName} = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
})
router.patch('/changeInfo',loginCheck,genValidator(userValidate),async(ctx,next) =>{
    const {nickName,picture,city} = ctx.request.body
    //调用controller
    ctx.body = await changeInfo(ctx,{nickName,picture,city})
})
router.patch('/changePassword',loginCheck,genValidator(userValidate),async(ctx,next) =>{
    const {password,newPassword} = ctx.request.body
    const {userName} = ctx.session.userInfo
    ctx.body = await changePassword(userName,password,newPassword)
})
router.post('/logout',loginCheck,async(ctx,next) =>{
    ctx.body = await logout(ctx)
})


module.exports=router