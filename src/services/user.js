/**
 * @description 数据处理层
 */

const {User} = require('../db/model/index')
const {formatUser} = require('./format')
const{doCrypto} = require('../utils/crypto')

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

const createUser = async({userName,password,gender=3,nickName}) =>{
    const result = await User.create({
        userName,
        password:doCrypto(password),
        gender,
        nickName:nickName ? nickName:userName
    })
    return result.dataValues
}
const delCurUser = async(userName) =>{
    const data = await User.destroy({
        where :{
            userName
        }
    })
    return data > 0
}

module.exports={
    getUserInfo,
    createUser,
    delCurUser
}