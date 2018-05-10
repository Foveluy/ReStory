export const isSSR = fn => {
  if (typeof window !== 'undefined') {
    fn(window)
  }
}
