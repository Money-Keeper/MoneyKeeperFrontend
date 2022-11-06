export function toCamelCase(str: string) {
  return str
    .split("_")
    .map((s, i) =>
      i === 0 ? s.toLowerCase() : s[0].toUpperCase() + s.slice(1),
    )
    .join("")
}

export const isDev = () => process.env.VERSEL_ENV !== "production"
