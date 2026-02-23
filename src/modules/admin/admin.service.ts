import { prisma } from "../../config/db.config";
import bcrypt from "bcryptjs";
import type { user } from "./utility";
import { AuthService } from "../auth/auth.service";

export class AdminService {
  constructor(
    private prismaService = prisma,
    private authService: AuthService,
  ) {}

  async createNewUser(data: user) {
    try {
      if (!data) {
        return {
          ok: false,
          error: "data required",
        };
      }

      const user = await this.authService.signup(
        data.fullName,
        data.email,
        data.password,
        data.role,
      );

      return {
        ok: true,
        data: user,
      };
    } catch (error: any) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
