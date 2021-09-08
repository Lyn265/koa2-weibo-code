/**
 * @description controller
 */

const {getUserInfo} = require('../services/user')
const {SuccessModel,ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo} = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {用户名}} username 
 */
async function isExist(username){
    //业务逻辑处理
    //调用service层获取数据
    const resData = await getUserInfo(username)
    //统一返回格式
    if(resData){
        return new SuccessModel(resData)
    }
    return new ErrorModel(registerUserNameNotExistInfo)
}

module.exports={
    isExist
}