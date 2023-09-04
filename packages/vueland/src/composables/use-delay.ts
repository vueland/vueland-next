export const delayProps = () => ({
  openDelay: {
    type: Number,
    default: 100,
  },
  closeDelay: {
    type: Number,
    default: 100,
  },
})

export const useDelay = (props) => {
  const openDelay = (fn) => {
    setTimeout(fn, props.openDelay)
  }

  const closeDelay = (fn) => {
    setTimeout(fn, props.closeDelay)
  }

  return {
    openDelay,
    closeDelay
  }
}
