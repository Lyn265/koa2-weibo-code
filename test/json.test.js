const server = require('./server')

test('验证接口是否正确',async () =>{
    const res = await server.get('/json')
    expect(res.body).toEqual({
      title: 'koa2 json'
    })
    expect(res.body.title).toBe('koa2 json')
})