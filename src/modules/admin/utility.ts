import type { Role } from "../../../generated/prisma";

export interface user {
  id: string;
  fullName: string;
  role: Role;
  email: string;
  password: string;
}
