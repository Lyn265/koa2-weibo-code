/**
 * @description 存储配置
 * 
 */

const {isProd} = require('../utils/env')

let REDIS_CONF = {
    port:6379,
    host:'127.0.0.1',
    password:'123456'
}


let MYSQL_CONF = {
    user:'root',
    password:'123456',
    host:'127.0.0.1',
    port:'3306',
    database:'koa2_weibo_db'
}

if(isProd){
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    },
    MYSQL_CONF = {
        user:'root',
        password:'123456',
        host:'127.0.0.1',
        port:'3306',
        database:'koa2_weibo_db'
    }
}


module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}