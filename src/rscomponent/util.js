export const getRidOf = str => {
  if (/\{[^\}]+\}/.test(str)) {
    return {
      string: str.replace(str.match(/\{[^\}]+\}/)[0], ''),
      number: str
        .match(/\{[^\}]+\}/)[0]
        .replace('{', '')
        .replace('}', '')
    }
  }
}
