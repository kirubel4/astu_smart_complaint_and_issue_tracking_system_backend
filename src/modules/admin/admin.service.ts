import { prisma } from "../../config/db.config";
import bcrypt from "bcryptjs";
import type { user } from "./utility";
import { AuthService } from "../auth/auth.service";
import { Role } from "../../../generated/prisma";

// import {
//   AssignComplaintDTO,
//   UpdateStatusDTO,
//   DeleteComplaintDTO,
// } from "./admin.types.ts";
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

      if (!user) {
        return {
          ok: false,
          message: "user signup faild",
        };
      }

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

  async getAllUsers() {
    try {
      const users = await this.prismaService.user.findMany({
        where: { OR: [{ role: Role.ADMIN }, { role: Role.STAFF }] },
      });

      if (!users) {
        return {
          ok: false,
          error: "no user (admin and staff)",
        };
      }
      return {
        ok: true,
        data: users,
      };
    } catch (error: any) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async getUserByID(id: string) {
    try {
      if (!id) {
        return {
          ok: false,
          error: "id required",
        };
      }
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!user) {
        return {
          ok: false,
          error: "no user by this id",
        };
      }
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
  
// update user role
  async updateUserRole(id: string, role: Role) {
    try {
      if (!id) {
        return {
          ok: false,
          error: "id required",
        };
      }

      const check = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!check) {
        return {
          ok: false,
          error: "no user with this id",
        };
      }
      const user = await this.prismaService.user.update({
        where: { id },
        data: { role },
      });

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

//remove user
  async removeUser(id: string) {
    try {
      if (!id) {
        return {
          ok: false,
          error: "id required",
        };
      }
      const check = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!check) {
        return {
          ok: false,
          error: "no user in this id",
        };
      }
      const deletedUser = await this.prismaService.user.delete({
        where: { id },
      });

      return {
        ok: true,
        data: deletedUser,
      };
    } catch (error: any) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async getAllComplaints(filters: any) {
    const data = await this.prismaService.complaint.findMany({
      where: {
        status: filters.status || undefined,
        categoryId: filters.categoryId || undefined,
        staffId: filters.staffId || undefined,
        studentId: filters.studentId || undefined,
      },
      include: {
        student: true,
        assignedTo: true,
        category: true,
        remarks: {
          include: {
            staff: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    if ((await data).length == 0) {
      return {
        ok: false,
        data: [],
        error: "no data found",
      };
    }
    return {
      ok: true,
      data,
    };
  }

  async getComplaintById(id: string) {
    const data = await this.prismaService.complaint.findUnique({
      where: { id },
      include: {
        student: true,
        assignedTo: true,
        category: true,
        remarks: {
          include: { staff: true },
        },
      },
    });
    if (!data) {
      return {
        ok: false,
        error: "no data found",
      };
    }

    return {
      ok: true,
      data,
    };
  }

  // Assign complaint to staff
  async assignComplaintToStaff(complaintId: string, staffId: string) {
    if (!complaintId) {
      return {
        ok: false,
        error: "no complaint with this id",
      };
    }
    const result = await this.prismaService.complaint.update({
      where: { id: complaintId },
      data: {
        staffId: staffId,
        status: "IN_PROGRESS",
      },
    });
    if (!result) {
      return {
        ok: false,
        error: "error during update man",
      };
    }
    return {
      ok: true,
      data: result,
    };
  }

  // Reassign complaint
  async reassignComplaint(complaintId: string, newStaffId: string) {
    if (!complaintId || !newStaffId) {
      return {
        ok: false,
        error: "wrong id",
      };
    }
    const data = await this.prismaService.complaint.update({
      where: { id: complaintId },
      data: {
        staffId: newStaffId,
      },
    });
    if (!data) {
      return {
        ok: false,
        error: "update failied man",
      };
    }
    return {
      ok: true,
      data,
    };
  }

  // Update complaint status
  async updateComplaintStatus(
    complaintId: string,
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED",
  ) {
    if (!complaintId) {
      return {
        ok: false,
        error: "no complaint with this id",
      };
    }
    const data = await this.prismaService.complaint.update({
      where: { id: complaintId },
      data: { status },
    });
    if (!data) {
      return { ok: false, error: "failed to update the data" };
    }
    return {
      ok: true,
      data,
    };
  }

  // Delete a complaint
  async deleteComplaint(complaintId: string) {
    if (!complaintId) {
      return {
        ok: false,
        error: "no complaint with this id",
      };
    }
    const data = await this.prismaService.complaint.delete({
      where: { id: complaintId },
    });
    if(!data){
      return{
        ok:false,
        error:"deletion failed"
      }
    }
    return{
      ok:true ,
      data
    }
  }

  // Admin dashboard analytics
  async getComplaintAnalytics() {
    const total = await this.prismaService.complaint.count();
    const open = await this.prismaService.complaint.count({
      where: { status: "OPEN" },
    });
    const inProgress = await this.prismaService.complaint.count({
      where: { status: "IN_PROGRESS" },
    });
    const resolved = await this.prismaService.complaint.count({
      where: { status: "RESOLVED" },
    });

    const byCategory = await this.prismaService.category.findMany({
      include: {
        _count: {
          select: { complaints: true },
        },
      },
    });

    return {
      total,
      open,
      inProgress,
      resolved,
      byCategory,

    };
  }
}
