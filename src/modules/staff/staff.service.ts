// staff.service.ts
import { Status } from "@prisma/client";
import { prisma } from "../../config/db.config";

export class StaffService {
  private prismaService = prisma;

  // Get all assigned complaints (staff-specific)
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

  // Get single complaint with policy:
  // - Admins can read any complaint
  // - STAFF can read only if complaint.staffId === staffId
  async getComplaintById(staffId: string, role: string, complaintId: string) {
    if (role === "ADMIN") {
      // Admins: bypass per-complaint check
      return await this.prismaService.complaint.findFirst({
        where: { id: complaintId },
        include: {
          student: true,
          category: true,
          remarks: { include: { staff: true } },
        },
      });
    }

    // STAFF path: enforce assignment ownership
    return await this.prismaService.complaint.findFirst({
      where: { id: complaintId, staffId },
      include: {
        student: true,
        category: true,
        remarks: { include: { staff: true } },
      },
    });
  }

  // Update complaint status
  async updateStatus(staffId: string, complaintId: string, status: Status) {
    // Ensure staff has permission
    const complaint = await this.prismaService.complaint.findFirst({
      where: { id: complaintId, staffId },
    });

    if (!complaint) {
      throw new Error("You are not assigned to this complaint");
    }

    // Valid transitions
    const allowed: Record<Status, Status[]> = {
      OPEN: ["IN_PROGRESS"],
      IN_PROGRESS: ["RESOLVED"],
      RESOLVED: [],
    };

    if (!allowed[complaint.status].includes(status)) {
      throw new Error(
        `Invalid status change from ${complaint.status} → ${status}`,
      );
    }

    return await this.prismaService.complaint.update({
      where: { id: complaintId },
      data: { status },
    });
  }

  // Add remark to complaint
  async addRemark(staffId: string, complaintId: string, message: string) {
    const complaint = await this.prismaService.complaint.findFirst({
      where: { id: complaintId, staffId },
    });

    if (!complaint) {
      throw new Error("You do not have access to this complaint");
    }

    return await this.prismaService.remark.create({
      data: {
        message,
        staffId,
        complaintId,
      },
    });
  }
}