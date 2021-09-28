const {getBlogListByUser} = require('../services/blog')
const {PAGE_SIZE} = require('../conf/contant')
const { SuccessModel } = require('../model/ResModel')
/**
 * 个人主页 controller
 */
async function getBlogProfileList(userName,pageIndex=0){
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize:PAGE_SIZE
    })
    const blogList = result.blogList
    return new SuccessModel({
        isEmpty:blogList.length === 0,
        pageIndex,
        pageSize:PAGE_SIZE,
        count:result.count,
        blogList
    })

}

module.exports={
    getBlogProfileList
}