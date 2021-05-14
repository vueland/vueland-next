export function dateStringSeparator(str) {
  const symbol = str.match(/\W/)[0];
  if (!symbol) return null;
  const separated = str.trim().split(symbol);
  return {
    symbol,
    separated
  };
}
//# sourceMappingURL=util.js.map