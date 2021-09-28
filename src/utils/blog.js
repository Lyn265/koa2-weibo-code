/**
 * 博客数据处理相关工具类
 * 
 */
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

/**
 * 获取blog-list.ejs 的文件内容
 */
const BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname,'..','views','widgets','blog-list.ejs')).toString()

function getBlogListStr(blogList=[],canReply=false){
    return ejs.render(BLOG_LIST_TPL,{
        blogList,
        canReply
    })
}

module.exports={
    getBlogListStr
}