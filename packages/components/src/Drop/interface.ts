

export interface dropProps {
  width?: string | number,
  height?: string | number,
  backgroundColor?: string,
  color?: string,
  fontSize?: string | number,
  title?: string | number,
  list?: any[],
  arrowCallback?: (e: MouseEvent) => void,
  ellipsisCallback?: (e: MouseEvent) => void,
  plusCallback?: (e: MouseEvent) => void,
}