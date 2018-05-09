const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()
const path = require('path')

// $ GET /package.json
// app.use(serve('.'))

// or use absolute paths
app.use(serve(path.resolve('./build')))

app.listen(3000)

console.log('listening on port 3000')
