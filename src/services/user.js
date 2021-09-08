/**
 * @description 数据处理层
 */

const {User} = require('../db/model/index')
const {formatUser} = require('./format')

const getUserInfo = async (userName,password) =>{
    const whereOpt = {
        userName
    }
    if(password){
        Object.assign(whereOpt,{password})
    }
    const result = await User.findOne({
        attributes:['id','userName','nickName','picture','city'],
        where:whereOpt
    })
    //未找到
    if(result == null){
        return result
    }
    const formatRes =  formatUser(result.dataValues)
    return formatRes
}

module.exports={
    getUserInfo
}