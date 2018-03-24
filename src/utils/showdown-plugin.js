const decodeHtml = require('html-encoder-decoder').decode,
    showdown = require('showdown'),
    Prism = require('prismjs'),
    languages = require('prism-languages')

export function showdownHighlight() {
    return {
        type: 'output',
        filter(text, converter, options) {
            let left = '<pre><code\\b[^>]*>',
                right = '</code></pre>',
                flags = 'g',
                replacement = (wholeMatch, match, left, right) => {
                    match = decodeHtml(match)
                    let lang = (left.match(/class=\"([^ \"]+)/) || [])[1]// eslint-disable-line 

                    if (languages[lang]) {
                        return (
                            left +
                            Prism.highlight(match, languages[lang]) +
                            right
                        )
                    } else {
                        console.log(lang)
                        
                        return left + Prism.highlight(match,languages['bash']) + right
                    }
                }

            return showdown.helper.replaceRecursiveRegExp(
                text,
                replacement,
                left,
                right,
                flags
            )
        }
    }
}
