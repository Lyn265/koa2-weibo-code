const Sequelize = require('sequelize')

const {MYSQL_CONF} = require('../conf/db')

const {user,password,host,port,database} = MYSQL_CONF

const {isProd,isTest} = require('../utils/env')

const conf = {
    host:host,
    dialect:'mysql'
}
if(isTest){
    conf.logging = () =>{}
}
//线上使用连接池
if(isProd){
    conf.pool = {
        max:5, //连接池中最大的连接数量
        min:0, //最小
        idle:10000 //如果一个连接池内10s没有被使用，则释放
    }
}
const seq = new Sequelize(database,user,password,conf)


//测试链接
seq.authenticate().then(() =>{
    console.log('ok')
}).catch((error) =>{
    console.log(error)
})
module.exports = seq