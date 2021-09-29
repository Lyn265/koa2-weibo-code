const server = require('../server')
const {COOKIE,USER_NAME} = require('../testUserInfo')

/**
 * 加载更多
 */
test('加载更多',async() =>{
  let userName = USER_NAME
  const res = await server.get(`/api/profile/loadMore/${userName}/0`)
  .set('cookie',COOKIE)
  const data = res.body.data
  expect(res.body.errno).toBe(0)
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('count')
  expect(data).toHaveProperty('blogList')
})