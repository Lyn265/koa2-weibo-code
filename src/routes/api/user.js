/**
 * @description user API路由
 */
const router = require('koa-router')()

const {isExist,register} = require('../../controller/user')
const {genValidator} = require('../../middlewares/validator')
const userValidate = require('../../validator/user')
router.prefix('/api/user')

router.post('/register',genValidator(userValidate),async(ctx,next) =>{
    const {userName,password,gender} = ctx.request.body
    //调controller
    ctx.body = await register({userName,password,gender})
})

router.post('/isExist',async(ctx,next) =>{
    const {userName} = ctx.request.body
    ctx.body= await isExist(userName)
})


module.exports=router