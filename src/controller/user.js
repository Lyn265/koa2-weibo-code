/**
 * @description controller
 */

const {getUserInfo,createUser} = require('../services/user')
const {SuccessModel,ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo,
    registerUserNameExistInfo
} = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {用户名}} username 
 */
async function isExist(username){
    //业务逻辑处理
    //调用service层获取数据
    const userInfo = await getUserInfo(username)
    //统一返回格式
    if(userInfo){
        return new SuccessModel(userInfo)
    }
    return new ErrorModel(registerUserNameNotExistInfo)
}
async function register({userName,password,gender}){
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        return new ErrorModel({
            registerUserNameExistInfo
        })
    }
    //调service
    try{
        await createUser({userName,password,gender})
        return new SuccessModel()
    }catch(ex){
        console.error(ex.message,ex.stack)
    }
}

module.exports={
    isExist,
    register
}