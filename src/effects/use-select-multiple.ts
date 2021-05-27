export function useSelectMultiple(items) {
  const select = (item) => {
    (items as any).forEach(it => {
      if (item.value === it.ref && it.active)  {
        console.log(it.active)
        it.active = false
      } else {
        it.active = item.value === it.ref
      }
    })
  }

  const multiple = () => {
    console.log('multiple')
  }

  return {
    select,
    multiple
  }
}
