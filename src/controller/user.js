/**
 * @description controller
 */

const {getUserInfo,createUser,delCurUser,updateUser} = require('../services/user')
const {SuccessModel,ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
} = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/crypto')
const { isTest } = require('../utils/env')
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
async function login({ctx,userName,password}){
    const userInfo =  await getUserInfo(userName,doCrypto(password))
    if(!userInfo){
        return new ErrorModel(loginFailInfo)
    }
    if(ctx.session.userInfo == null){
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}
async function deleteCurUser(userName){
    if(isTest){
        const result = await delCurUser(userName)
        if(result){
            return new SuccessModel()
        }
        return new ErrorModel(deleteUserFailInfo)
    }
}
async function changeInfo(ctx,{nickName,city,picture}){
    const {userName} = ctx.session.userInfo
    if(!nickName){
        nickName = userName
    }
    const result = await updateUser({
        newNickName:nickName,
        newCity:city,
        newPicture:picture
    },{userName})
    if(result){
        Object.assign(ctx.session.userInfo,{
            nickName,city,picture
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)

}
async function changePassword(userName,password,newPassword){
    const result = await updateUser({
        newPassword:doCrypto(newPassword)
    },{userName,password:doCrypto(password)})
    if(result){
        return new SuccessModel()
    }
    return new ErrorModel(changePasswordFailInfo)
}
async function logout(ctx){
    delete ctx.session.userInfo
    return new SuccessModel()
}


module.exports={
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}