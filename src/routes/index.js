const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        msg:'こんにちは',
        isMe:false,
        blogList:[
            {
                id:1,
                title:'aaa'
            },
            {
                id:2,
                title:'bbb'
            },
            {
                id:3,
                title:'ccc'
            },
            {
                id:4,
                title:'ddd'
            },
        ]
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

module.exports = router
