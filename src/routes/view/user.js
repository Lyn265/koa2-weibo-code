const router = require('koa-router')()

/**
 * 
 * @param {object} ctx 
 */
function getLoginInfo(ctx){
    let data = {
        isLogin:false
    }
    if(ctx.session.userInfo){
        data = {
            isLogin:true,
            userName:ctx.session.userInfo.userName
        }
    }
    return data
}
router.get('/register',async(ctx,next) =>{
    await ctx.render('register',getLoginInfo(ctx))
})

router.get('/login',async(ctx,next) =>{
    await ctx.render('login',getLoginInfo(ctx))
})


module.exports = router