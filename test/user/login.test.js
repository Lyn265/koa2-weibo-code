/**
 * @description 登录单元测试
 * 
 */

const server = require('../server')

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName:userName,
  gender:1
}

//存储cookie
let COOKIE = 'weibo:sid=RBRwVUP50ZidJ-ByE51gX_oGyk80delY; weibo:sid.sig=HoekC3gVg-AsEjyMUQ9LEKxNQMA'
//注册
test('测试注册用户，成功',async() =>{
  const res = await server.post('/api/user/register')
  .send(testUser)
  expect(res.body.errno).toBe(0)
})
//重复注册
test('测试注册用户，成功',async() =>{
  const res = await server.post('/api/user/register')
  .send(testUser)
  expect(res.body.errno).not.toBe(0)
})
//查询用户是否存在
test('查询已注册的用户，应该存在',async() =>{
  const res = await server.post('/api/user/isExist')
  .send(
    {userName}
  )
  expect(res.body.errno).toBe(0)
})
//json schema 验证 非法格式 应该失败
test('非法格式注册',async() =>{
  const res = await server.post('/api/user/register')
  .send({
    userName:'12345',//应该字母开头
    password:'asdfg',
    gender:'mail' //不是数字
  })
  expect(res.body.errno).not.toBe(0)
})
//登录
test('已注册账号登录测试，成功',async() =>{
  const res = await server.post('/api/user/login')
  .send({
    userName,
    password
  })
  expect(res.body.errno).toBe(0)
  //获取cooke
  COOKIE = res.headers['set-cookie'].join(';')
})
test('修改基本信息应该成功',async() =>{
  const res = await server.patch('/api/user/changeInfo')
  .set('cookie',COOKIE)
  .send({
        nickName:'测试昵称',
        city:'测试城市',
        picture:'/test.png'
  })
  expect(res.body.errno).toBe(0)
})
test('修改密码应该成功',async() =>{
  const res = await server.patch('/api/user/changePassword')
  .set('cookie',COOKIE)
  .send({
    userName,
    password,
    newPassword:`p_${Date.now()}`
  })
  expect(res.body.errno).toBe(0)
})
//删除用户
test('删除用户应该成功',async() =>{
  const res = await server.post('/api/user/delete')
  .set('cookie',COOKIE)
  expect(res.body.errno).toBe(0)
})
//再次查询用户是否存在
test('查询已注册的用户，应该存在',async() =>{
  const res = await server.post('/api/user/isExist')
  .send(
    {userName}
  )
  expect(res.body.errno).not.toBe(0)
})
test('退出登录',async() =>{
  const res = await server.post('/api/user/logout')
    .set('cookie',COOKIE)
    expect(res.body.errno).toBe(0)
})
