type Separated = {
  symbol: string,
  separated: (string | number)[]
}

export function dateStringSeparator(str: string): Separated | null {
  const matchArray: RegExpMatchArray | null = str.match(/\W/)
  const symbol: string | null = matchArray && matchArray[0]

  if (!symbol) return null
  const separated = str.trim().split(symbol)

  return { symbol, separated } as Separated
}