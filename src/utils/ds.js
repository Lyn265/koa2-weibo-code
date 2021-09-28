const {format} = require('date-fns')

/**
 * 时间相关的工具函数
 */
function timeFormat(str){
    return format(new Date(str),'MM.dd HH:mm')
}
module.exports = {
    timeFormat
}