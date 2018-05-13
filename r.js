// const fun1 = async (ctx, next) => {
//   next()
//   console.log('我是中间件1')
//   console.log('哈哈哈')
// }

// const fun2 = async (ctx, next) => {
//   console.log('我是中间件2')
//   // next()
// }

// const mid = []
// mid.push(fun1)
// mid.push(fun2)

// let i = -1

// dispatch(0)
// function dispatch(index) {
//   if (index <= i) return Promise.reject(new Error('next() called multiple times'))
//   i = index
//   let fn = mid[index]
//   if (!fn) return Promise.resolve()
//   try {
//     Promise.resolve(
//       fn('ddd', function next() {
//         return dispatch(index + 1)
//       })
//     )
//   } catch (e) {
//     return Promise.reject(e)
//   }
// }

// const { join, resolve } = require('path')
// const fs = require('fs-extra')


// const naviPath = join('./docs', 'navi')
// const files = fs.readdirSync(resolve(naviPath)).map(f => {
//   if (/^\d+./.test(f)) {
//     // console.log(f)
//   }
  
//   return f.replace(/^\d+./, '')
// })
// console.log(files)
