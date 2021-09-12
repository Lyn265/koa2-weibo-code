/**
 * @description user API路由
 */
const router = require('koa-router')()

const {isExist,register,login,deleteCurUser} = require('../../controller/user')
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


module.exports=router