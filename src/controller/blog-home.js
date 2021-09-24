const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {createBlogFailInfo} = require('../model/ErrorInfo')
const {createBlog} = require('../services/blog')
const xss = require('xss')
const blogValidate = require('../validator/blog')
/**
 * 创建微博
 * @param {Object} param0 
 */

async function create({content,image,userId}){
    //service
    try {
        const blog = await  createBlog(
            {
                content:xss(content),
                image,
                userId})
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.error,ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}
module.exports = {
    create
}