export function isCssColor(color: string): boolean {
  return !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/);
}
