/**
 * 微博数据模型单元测试
 */

const {Blog} = require('../../src/db/model/index')

test('微博数据模型单元测试',() =>{
  const blog = Blog.build({
    content:'微博内容',
    image:'/test.png',
    userId:1
  })
  expect(blog.content).toBe('微博内容')
  expect(blog.image).toBe('/test.png')
  expect(blog.userId).toBe(1)
})

