export class ContentValidationError extends Error {
  readonly filePath: string
  readonly field: string

  constructor(filePath: string, field: string, reason: string) {
    super(`${filePath} [${field}] ${reason}`)
    this.name = "ContentValidationError"
    this.filePath = filePath
    this.field = field
  }
}
