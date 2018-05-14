var pinyin = require('pinyin')
const merge = ary => {
  let string = ''
  ary.forEach(a => {
    if (a instanceof Array) {
      string += merge(a)
    } else {
      string += a
    }
  })
  return string.replace(' ', '')
}

const chinese2pinyin = word => {
  const ary = pinyin(word, {
    style: pinyin.STYLE_NORMAL, // 设置拼音风格
    heteronym: true
  })

  return merge(ary)
}
exports.chinese2pinyin = chinese2pinyin
