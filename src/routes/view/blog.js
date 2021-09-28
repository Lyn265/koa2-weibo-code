const router = require('koa-router')()

const {loginRedirect} = require('../../middlewares/userChecks')
const {getBlogProfileList} = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
//首页
router.get('/',loginRedirect,async(ctx,next) =>{
    await ctx.render('index',{})
})
//个人主页
router.get('/profile',loginRedirect,async(ctx,next) =>{
    const {userName} = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
//个人主页
router.get('/profile/:userName',loginRedirect,async(ctx,next) =>{
    //已登录用户的信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName
    let curUserInfo
    const {userName:curUserName} = ctx.params
    const isMe = myUserName === curUserName
    if(isMe){
        curUserInfo = myUserInfo
    }else{
        const existResult =  await isExist(curUserName)
        if(existResult.errno!=0){
            用户名不存在
            return
        }
        //用户名已存在
        curUserInfo = existResult.data
    }
    const result = await getBlogProfileList(curUserName,0)
    const{isEmpty,pageIndex,pageSize,count,blogList} = result.data
    console.log(result.data)
    await ctx.render('profile',{
        blogData:{
            isEmpty,
            pageIndex,
            pageSize,
            count,
            blogList
        },
        userData:{
            userInfo:curUserInfo,
            isMe
        }
    })
})
module.exports=router