import { use } from "react";
import { Role } from "../../../generated/prisma";
import { ApiResponseBuilder } from "../../common/utils/ApiResponse";
import { prisma } from "../../config/db.config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private prismaService = prisma) {}

  async signup(fullName: string, email: string, password: string, role: Role) {
    try {
      const check = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (check) {
        return {
          ok: false,
          error: "User exists",
        };
      }
      const hashed = await bcrypt.hash(password, 10);

      const user = await this.prismaService.user.create({
        data: {
          fullName,
          email,
          role,
          password: hashed,
        },
      });

      return {
        ok: true,
        data: {
          id: user.id,
          fullName: user.fullName,
          role: user.role,
        },
      };
    } catch (error: any) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
  async login(password: string, email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!user) {
        return {
          ok: false,
          error: "Invalid credential",
        };
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          ok: false,
          error: "password invalid",
        };
      }

      const accessPayLoad = {
        fullName: user.fullName,
        role: user.role,
        id: user.id,
      };

      const token = jwt.sign(accessPayLoad, process.env.ACCESS_SECRET!, {
        expiresIn: "59m",
      });
      return {
        ok: true,
        data: {
          id: user.id,
          fullName: user.fullName,
          aToken: token,
          role: user.role,
          email: user.email,
        },
      };
    } catch (error: any) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async changePassword(
    email: string,
    currentPassword: string,
    newPassword: string,
  ) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!user) {
        return {
          ok: false,
          error: "no user in this email",
        };
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isPasswordValid){
        return {
            ok: false,
            error: "password invalid"
        }
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const changePassword = await this.prismaService.user.update({
        where: {email},
        data: {password: hashedPassword},
      });

      return {
        ok: true,
        data: changePassword
      }
    } catch (error: any) {
        return{
            ok: false,
            error: error.message,
        }
    }
  }
}

