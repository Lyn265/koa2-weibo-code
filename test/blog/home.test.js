/**
 * 首页
 */
 const server = require('../server')
  
  const content = '新创建一条微博'+Date.now()
  const image = '/test.png' 
  const {COOKIE} = require('../testUserInfo')
  let BLOG_ID = ''
 test('创建一条微博，应该成功',async() =>{
      const res = await server
      .post('/api/blog/create')
      .send({
        content,
        image
      })
      .set('cookie',COOKIE)

      expect(res.body.errno).toBe(0)
      expect(res.body.data.content).toBe(content)
      expect(res.body.data.image).toBe(image)
      BLOG_ID = res.body.data.id
 })

