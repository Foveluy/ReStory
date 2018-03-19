const showdown = require('showdown')
var loaderUtils = require('loader-utils');

function trim(str){ 
    return str.replace(/(^\s*)|(\s*$)/, ""); 
  }

showdown.extension('custom-header-id', function () {
    var rgx = /^(\#{1,6})([^\#\n]+)$/gmi;// eslint-disable-line
    
    return [{
      type: 'listener',
      listeners: {
        'headers.before': function (event, text, converter, options, globals) {
            
          text = text.replace(rgx, function (wm, hLevel, hText, hCustomId) {
            // find how many # there are at the beginning of the header
            // these will define the header level
            hLevel = hLevel.length;
           
            // since headers can have markdown in them (ex: # some *italic* header)
            // we need to pass the text to the span parser
            hText = showdown.subParser('spanGamut')(hText, options, globals);
            hText = trim(hText)
            
            // create the appropriate HTML
            var header = '<h' + hLevel + ' id="' + hText + '">' + hText + '</h' + hLevel + '>';
            
            // hash block to prevent any further modification
            return showdown.subParser('hashBlock')(header, options, globals);
          });
          
          // return the changed text
          return text;
        }
      }
    }];
  });

const convertor = new showdown.Converter({extensions: ['custom-header-id']})

module.exports = function(source) {
    
    const srt  = convertor.makeHtml(source)

    return srt
}
