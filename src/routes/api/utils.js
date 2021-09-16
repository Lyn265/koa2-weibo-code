const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/userChecks')
const uploadForm = require('formidable-upload-koa')
const{saveFile} = require('../../controller/utils')

router.prefix('/api/utils')


router.post('/upload',loginCheck,uploadForm(),async(ctx,next) =>{
    //获取文件
    const file = ctx.req.files['file']
    if(!file){
        return
    }
    const {name,type,size,path} = file
    //call controller
    ctx.body = await saveFile({
        name,
        size,
        type,
        filePath:path
    })
})


module.exports = router