/**
 * @description 数据模型入口文件
 */
const User = require('./User')
const Blog = require('./Blog')
//一对一
Blog.belongsTo(User,{
    foreignKey:'userId'
})
// User.hasMany() 1对多
module.exports = {
    User,
    Blog
}