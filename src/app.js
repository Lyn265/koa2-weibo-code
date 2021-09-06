const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {REDIS_CONF} = require('./conf/db')
const index = require('./routes/index')
const userViewRouter = require('./routes/view/user')
const errorViewRouter = require('./routes/view/error')
const {isProd} = require('./utils/env')
// error handler
let errorConf = {}
if(isProd){
    errorConf = {
        redirect:'/error'
    }
}
onerror(app,errorConf)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

//session配置
app.keys = ['keykeys']
app.use(session({
    key:'weibo:sid',  //cookie name 默认是koa.sid
    prefix:'weibo:sess:', //redis key的前缀 默认是'koa:sess:'
    cookie:{
        path:'/',
        httpOnly:true,
        maxAge:24 * 60 * 60 * 1000  //毫秒
    },
    store:redisStore({
        all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(),userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods()) //404最下面

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
