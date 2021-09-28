/**
 * 个人主页 API路由
 * 
 */
const router = require('koa-router')()
const {getBlogListStr} = require('../../utils/blog')
const {loginCheck} = require('../../middlewares/userChecks')
const{getBlogProfileList} = require('../../controller/blog-profile')
router.prefix('/api/profile')

router.get('/loadMore/:userName/:pageIndex',loginCheck,async(ctx,next) =>{
    let {userName,pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getBlogProfileList(userName,pageIndex)

    //渲染html字符串
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router