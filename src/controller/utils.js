const {ErrorModel, SuccessModel} = require('../model/ResModel')
const {uploadFileSizeFailInfo} = require('../model/ErrorInfo')
const path = require('path')
const fse = require('fs-extra')

//上传文件最大不超过1M
const MAX_SIZE = 1024*1024*1024
/**
 * 
 * @param {object} param 文件信息
 */
const DIST_FOLDER_PATH = path.join(__dirname,'..','..','uploadFile')

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})
async function saveFile({name,size,type,filePath}){
    if(size > MAX_SIZE){
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    //移动文件
    //文件名
    const fileName = Date.now() + '.' + name //防止重名
    //文件目的地路径
    const distFilePath = path.join(DIST_FOLDER_PATH,fileName)
    await fse.move(filePath,distFilePath)

    //返回信息
    return new SuccessModel({
        url:'/' + fileName
    })
}


module.exports={
    saveFile
}