export function useSelectMultiple(items) {
  const select = (item) => {
    items.forEach(it => it.active = item === it)
  }

  const multiple = () => {
    console.log('multiple')
  }

  return {
    select,
    multiple
  }
}
