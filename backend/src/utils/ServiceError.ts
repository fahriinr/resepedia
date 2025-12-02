export class ServiceError extends Error {
  public code: string;
  public details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.code = code;
    this.details = details;
  }
}
