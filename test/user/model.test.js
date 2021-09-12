const {User} = require('../../src/db/model/index')
/**
 * @description 用户模型测试
 */

test('User 各个模型的属性，是否符合预期',() =>{
  //build会构建一个内存的User 实例，但不会存进数据库
  const user = User.build({
    userName:'zhangsan',
    password:'12345',
    nickName:'张三',
    picture:'/xxx.png',
    city:'北京'
  })
  //验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('12345')
  expect(user.nickName).toBe('张三')
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('北京')
  
})
