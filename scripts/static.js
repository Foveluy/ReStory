const staticServer = require('koa-static')
const { resolve } = require('path')
const koa = require('koa')
var cors = require('@koa/cors')

const app = new koa()

// app.use(cors())
//加载表态文件
app.use(async (ctx, next) => {
    ctx.response.set('Access-Control-Allow-Origin', '*')
    await next()
})

app.use(staticServer(resolve('docs')))


app.listen(54321)
