export function useSelectMultiple(items) {
  const select = (item) => {
    (items as any).forEach(it => {
      it.active = item.value === it.ref
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
