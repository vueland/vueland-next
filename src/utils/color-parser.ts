export function isCssColor(color?: string | false): boolean {
  return !!color && !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/);
}
