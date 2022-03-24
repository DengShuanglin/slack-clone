export interface ResponseEntity<T = any> {
  result?: T
  status: string
  message: string
}
