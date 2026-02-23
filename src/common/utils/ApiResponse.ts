import type { Response } from "express"; // Type-only import
import type { ApiResponseMeta, ApiResponseObject } from "../constant/http"; // Type-only imports
import { HttpStatusCode, HttpStatusMessage } from "../constant/http"; // Regular imports

export class ApiResponseBuilder<T = any> {
  private statusCode: HttpStatusCode = HttpStatusCode.OK;
  private message: string = HttpStatusMessage[HttpStatusCode.OK];
  private data?: T; 
  private meta?: ApiResponseMeta; 

  ok(message?: string, data?: T): this {
    this.statusCode = HttpStatusCode.OK;
    this.message = message || HttpStatusMessage[HttpStatusCode.OK];
    
    if (data !== undefined) {
      this.data = data; 
    }

    return this;
  }

  created(message?: string, data?: T): this {
    this.statusCode = HttpStatusCode.CREATED;
    this.message = message || HttpStatusMessage[HttpStatusCode.CREATED];
    
    if (data !== undefined) {
      this.data = data; 
    }

    return this;
  }

  build(res: Response) {
    const body: ApiResponseObject<T> = {
      success: this.statusCode < 400,
      statusCode: this.statusCode,
      message: this.message,
      ...(this.data !== undefined ? { data: this.data } : {}),
      ...(this.meta !== undefined ? { meta: this.meta } : {}),
    };

    return res.status(this.statusCode).json(body);
  }
}