export const throttle = (fn: Function, timeout: number): Function => {
  let lastThis: any = null
  let lastArgs: any = null
  let isThrottled = false

  function wrapper(...args) {
    if (isThrottled) {
      // @ts-ignore
      lastThis = this
      lastArgs = args
      return
    }

    lastArgs && fn.call(lastThis, ...lastArgs)

    isThrottled = true

    setTimeout(() => {
      isThrottled = false

      if (lastArgs) {
        wrapper.apply(lastThis, lastArgs)
      }
      lastThis = null
      lastArgs = null
    }, timeout)
  }

  return wrapper
}
