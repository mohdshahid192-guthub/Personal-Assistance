export class ApiResponse<T = any> {
  public statusCode: number;
  public success: boolean
  public message: string
  public data: T

  constructor(statusCode: number, data: T, message: string){
    this.statusCode = statusCode,
    this.success = statusCode < 400,
    this.data = data
    this.message = message
  }


}