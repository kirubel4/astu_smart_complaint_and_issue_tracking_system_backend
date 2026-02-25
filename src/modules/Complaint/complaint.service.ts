import { Status } from "../../../generated/prisma";
import { prisma } from "../../config/db.config";
export class ComplaintService {
  constructor(private prismaService = prisma) {}

  async createComplaint(
    studentId: string,
    data: {
      title: string;
      description: string;
      categoryId: string;
      attachment?: string;
    },
  ) {
    return await this.prismaService.complaint.create({
      data: {
        ...data,
        studentId,
      },
    });
  }

  async getMyComplaints(studentId: string) {
    return await this.prismaService.complaint.findMany({
      where: { studentId },
      include: {
        category: true,
        assignedTo: true,
        remarks: true,
      },
    });
  }

  async getComplaintByIdForStudent(id: string, studentId: string) {
    return await this.prismaService.complaint.findFirst({
      where: {
        id,
        studentId,
      },
      include: {
        category: true,
        assignedTo: true,
        remarks: {
          include: { staff: true },
        },
      },
    });
  }

  async updateMyComplaint(id: string, studentId: string, data: any) {
    return await this.prismaService.complaint.updateMany({
      where: {
        id,
        studentId,
        staffId: null, // cannot edit after assigned
      },
      data,
    });
  }

  async deleteMyComplaint(id: string, studentId: string) {
    return await this.prismaService.complaint.deleteMany({
      where: { id, studentId },
    });
  }

  async getAssignedComplaints(staffId: string) {
    return await this.prismaService.complaint.findMany({
      where: { staffId },
      include: {
        student: true,
        category: true,
        remarks: {
          include: { staff: true },
        },
      },
    });
  }
  async updateStatus(staffId: string, complaintId: string, status: Status) {
    return await this.prismaService.complaint.update({
      where: { id: complaintId },
      data: {
        status,
      },
    });
  }

  async addRemark(staffId: string, complaintId: string, message: string) {
    return await this.prismaService.remark.create({
      data: {
        staffId,
        complaintId,
        message,
      },
    });
  }

}
