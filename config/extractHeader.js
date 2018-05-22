const showdown = require('showdown')
const fs = require('fs')

function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/, '')
}
class MdConvertor {
  constructor() {
    this.header = []
  }

  init() {
    var that = this
    showdown.extension('custom-header-id', () => {
      var rgx = /^(\#{1,6})([^\#\n]+)$/gim // eslint-disable-line

      return [
        {
          type: 'listener',
          listeners: {
            'headers.before': function(event, text, converter, options, globals) {
              text = text.replace(rgx, function(wm, hLevel, hText, hCustomId) {
                // find how many # there are at the beginning of the header
                // these will define the header level
                hLevel = hLevel.length
                // since headers can have markdown in them (ex: # some *italic* header)
                // we need to pass the text to the span parser
                hText = showdown.subParser('spanGamut')(hText, options, globals)
                hText = trim(hText)
                // create the appropriate HTML
                var header = '<h' + hLevel + ' id="' + hText + '">' + hText + '</h' + hLevel + '>'
                if (hLevel <= 2) {
                  that.header.push({
                    hLevel: hLevel,
                    hText: trim(hText)
                  })
                }
                // hash block to prevent any further modification
                const res = showdown.subParser('hashBlock')(header, options, globals)
                return res
              })
              // return the changed text
              return text
            }
          }
        }
      ]
    })

    this.convertor = new showdown.Converter({
      extensions: ['custom-header-id']
    })
    this.convertor.setOption('tasklists', true)
    return this.convertor
  }
}

function extractHeader(src) {
  const convertor = new MdConvertor()

  const i = convertor.init().makeHtml(fs.readFileSync(src, 'utf-8'))
  let headers = []
  let index = -1
  convertor.header.forEach(h => {
    if (h.hLevel === 1) {
      headers.push([h.hText, []])
      index++
    } else if (h.hLevel === 2) {
      if (!headers[index]) {
        index = headers.length
        headers[index] = ['no-h1', []]
      }
      headers[index][1].push(h.hText)
    }
  })
  return headers
}

exports.extractHeader = extractHeader
