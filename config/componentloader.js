const { resolve, join } = require('path')
const fs = require('fs-extra')

module.exports = function(source, map, meta) {
  const preload = resolve(__dirname, '../src/block.js')
  const pre = `import { Tip, Warning, Danger } from '${preload}'`

  const componentsPath = resolve(process.argv[3], './.reactstory/components')
  fs.ensureDirSync(componentsPath)
  const files = fs.readdirSync(componentsPath)
  const components =
    files
      .map(f => {
        let imp = `import ${f.replace(/\.(js|jsx)$/, '')} from '${resolve(componentsPath, f)}'`
        return imp
      })
      .join('\n') + '\n\n\n'

  this.addContextDependency(componentsPath)
  this.callback(null, pre + components + source, map, meta)
  return // always return undefined when calling callback()
}
