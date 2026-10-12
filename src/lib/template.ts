// Fills "{name}" placeholders. Copy passed from server to client components must be plain strings,
// so variable parts are written as templates instead of functions.
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match))
}

// Same as fill, but keeps each value as its own text node, as JSX interpolation does.
export function fillParts(template: string, values: Record<string, string | number>): (string | number)[] {
  return template
    .split(/(\{\w+\})/)
    .map((part) => {
      const key = part.match(/^\{(\w+)\}$/)?.[1]
      return key !== undefined && key in values ? values[key] : part
    })
    .filter((part) => part !== '')
}
