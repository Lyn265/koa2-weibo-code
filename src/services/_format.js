/**
 * @description 数据格式化
 */
const { DEFAULT_PICTURE } = require('../conf/contant')
function _formatUserPicture(obj){
    if(obj.picture == null){
        obj.picture = DEFAULT_PICTURE
    }
    return obj
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
    formatUser
}