import { prisma } from "../../config/db.config";
import bcrypt from "bcryptjs";

export class StudentService {
    constructor(
        private prismaService = prisma) {}
        
  // Get student profile
  async getProfile(studentId: string) {
    return await this.prismaService.user.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  // Update student profile
  async updateProfile(studentId: string, data: any) {
    const updateData: any = { ...data };

    if (typeof updateData.password === "string" && updateData.password.trim() !== "") {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    return await this.prismaService.user.update({
      where: { id: studentId },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });
  }

  // Get complaint history
  async getMyComplaints(studentId: string) {
    return await this.prismaService.complaint.findMany({
      where: { studentId },
      include: {
        category: true,
        assignedTo: true,
        remarks: {
          include: { staff: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
