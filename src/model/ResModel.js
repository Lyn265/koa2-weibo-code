/**
 * @description 统一返回类封装
 */

class BaseModel {
    constructor({errno,message,data}){
        this.errno = errno
        if(message){
            this.message = message
        }
        if(data){
            this.data = data
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data={}){
        super({
            errno:0,
            data
        })
    }
}
class ErrorModel extends BaseModel {
    constructor({errno,message}){
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}