import { prisma } from "../../config/db.config";

export class RemarkService {
  constructor(
    private prismaService = prisma,
  ) {}

   // Staff adds a remark on a complaint
  async addRemark(staffId: string, complaintId: string, message: string) {
  return await this.prismaService.remark.create({
    data: {
      message,
      staffId,
      complaintId,
    },
    include: {
      staff: true,
    },
  });
}

  // Get all remarks for a complaint
  async getRemarksForComplaint(complaintId: string) {
    return await this.prismaService.remark.findMany({
      where: { complaintId },
      orderBy: { createdAt: "asc" },
      include: {
        staff: true,
      },
    });
  }

  // Admin or Staff can delete a remark
  async deleteRemark(remarkId: string) {
    return await this.prismaService.remark.delete({
      where: { id: remarkId },
    });
  }

}