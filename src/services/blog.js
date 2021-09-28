
const {Blog,User} = require('../db/model/index')
const {formatUser,formatBlog} = require('./_format')
/**
 * 
 * @param {object} param0 
 * @returns 
 */
async function createBlog({userId,content,image}){
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}
/**
 * 
 * @param {object} param0 
 */
async function getBlogListByUser(
    {userName,pageIndex=0,pageSize=5}
){
    const userWhereOpt = {}
    if(userName){
        userWhereOpt.userName = userName
    }
    const result = await Blog.findAndCountAll({
        limit:pageSize,
        offset:pageSize*pageIndex,
        order:[
            ['id','desc']
        ],
        //连表查询(user表)
        include:[
            {
                model:User,
                attributes:['userName','nickName','picture'],
                where:userWhereOpt
            }
        ]
    })
    //result.count 查询总数
    //result.rows 查询结果集 数组
    let blogList = result.rows.map(row =>row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem =>{
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })
    return {
        blogList,
        count:result.count
    }
}
module.exports = {
    createBlog,
    getBlogListByUser
}
