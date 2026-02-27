import type { Request, Response } from 'express';
import { ApiResponseBuilder } from '../../common/util/ApiResponse';
import { AuthService } from './auth.service';
import { Role } from "@prisma/client"
import { prisma } from '../../config/db.config';

const authService = new AuthService(prisma);

export class AuthController {
  // Sign up: POST /api/v1/auth/signup
  static async signup(req: Request, res: Response) {
    try {
      const { fullName, email, password, role } = req.body;

      // Optional: validate role if you want to restrict to certain roles
      // if (!Object.values(Role).includes(role)) { ... }

      const result = await authService.signup(fullName, email, password, role as Role);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .created('User registered successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error?.message).build(res);
    }
  }

  // Log in: POST /api/v1/auth/login
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(password, email);

      if (!result.ok) {
        return new ApiResponseBuilder().unauthorized(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('Login successful')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error?.message).build(res);
    }
  }
}