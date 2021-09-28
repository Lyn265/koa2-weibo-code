/**
 * @description 数据格式化
 */
const { DEFAULT_PICTURE,REG_FOR_AT_WHO } = require('../conf/contant')
const {timeFormat} = require('../utils/ds')
/**
 * 
 * @param {object} obj 
 * @returns 
 */
function _formatUserPicture(obj){
    if(obj.picture == null){
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}
/**
 * 
 * @param {object} obj 
 * @returns 
 */
function _formatDBTime(obj){
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}
/**
 * 
 * @param {object} obj 
 */
function _formatContent(obj){
    obj.contentFormat = obj.content
    // 格式化 @
    // from '哈喽 @张三 - zhangsan 你好'
    // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )
    return obj
}
/**
 * 
 * @param {object,list} list 
 */
function formatBlog(list){
    if(list == null){
        return list
    }
    if(list instanceof Array){
        return list.map(_formatDBTime).map(_formatContent)
        
    }
    //如果是对象
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}
/**
 * 
 * @param {obj,list} list 
 */
function formatUser(list){
    if(list == null){
        return list
    }
    //如果是数组
    if(list instanceof Array){
        return list.map(_formatUserPicture)
    }
    //如果是单个对象
    return _formatUserPicture(list)
}

module.exports = {
    formatUser,
    formatBlog
}