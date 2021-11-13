const {set,get} = require('./_redis')
const {getBlogListByUser} = require('../services/blog')

//获取缓存中的广场信息

//key 前缀
const KEY_PREFIX = 'weibo:square:'
async function getSquareCacheList(pageIndex,pageSize){
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
    //先判断缓存
    const cacheResultt = await get(key)
    if(cacheResultt!=null){
        return cacheResultt
    }
    const resultDB = await getBlogListByUser({pageIndex,pageSize})
    set(key,resultDB,60)
    return resultDB
}

module.exports={
    getSquareCacheList
}

