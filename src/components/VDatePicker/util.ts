type Separated = {
  symbol: string,
  separated: (string | number)[]
}

export function dateStringSeparator(str: string): Separated | null {
  const symbol: string | null = str.match(/\W/)![0]

  if (!symbol) return null

  const separated = str.trim().split(symbol)

  return { symbol, separated }
}