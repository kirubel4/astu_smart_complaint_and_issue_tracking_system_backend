import type { Request, Response } from 'express';
import { ApiResponseBuilder } from '../../common/util/ApiResponse';
import { AdminService } from './admin.service';
import { AuthService } from '../auth/auth.service'; 
import { prisma } from '../../config/db.config';

const authService = new AuthService();

const adminService = new AdminService(prisma,authService);

export class AdminController {
  static async getAllComplaints(req: Request, res: Response) {
    try {
      const filters = {
        status: req.query.status?.toString() || undefined,
        categoryId: req.query.categoryId?.toString() || undefined,
        staffId: req.query.staffId?.toString() || undefined,
        studentId: req.query.studentId?.toString() || undefined,
      };

      const result = await adminService.getAllComplaints(filters);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('Complaints retrieved successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }
// create user
  static async createNewUser(req: Request, res: Response) {
    try {
      const data = req.body;

      const result = await adminService.createNewUser(data);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .created('User created successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }
// get users
  static async getAllUsers(req: Request, res: Response) {
    try {
      const result = await adminService.getAllUsers();

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('Users retrieved successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }
// by id get users
  static async getUserByID(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await adminService.getUserByID(id as string);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('User retrieved successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // update user role
  static async updateUserRole(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const result = await adminService.updateUserRole(id as string, role);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('User role updated successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // remove users
  static async removeUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await adminService.removeUser(id as string);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('User deleted successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  static async getComplaintById(req: Request, res: Response) {
    try {
      const { id } = req.params ;
      const result = await adminService.getComplaintById(id as string);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('Complaint retrieved successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // assign complaint to staff
  static async assignComplaintToStaff(req: Request, res: Response) {
    try {
      const { complaintId, staffId } = req.body;
      const result = await adminService.assignComplaintToStaff(complaintId, staffId);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('Complaint assigned successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  static async reassignComplaint(req: Request, res: Response) {
    try {
      const { complaintId, newStaffId } = req.body;
      const result = await adminService.reassignComplaint(complaintId, newStaffId);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('Complaint reassigned successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  static async updateComplaintStatus(req: Request, res: Response) {
    try {
      const { complaintId, status } = req.body;
      const result = await adminService.updateComplaintStatus(complaintId, status);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('Complaint status updated successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  static async deleteComplaint(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await adminService.deleteComplaint(id as string);

      if (!result.ok) {
        return new ApiResponseBuilder().badRequest(result.error).build(res);
      }

      return new ApiResponseBuilder()
        .ok('Complaint deleted successfully')
        .withData(result.data)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  static async getComplaintAnalytics(req: Request, res: Response) {
    try {
      const result = await adminService.getComplaintAnalytics();

      return new ApiResponseBuilder()
        .ok('Complaint analytics retrieved successfully')
        .withData(result)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }
}