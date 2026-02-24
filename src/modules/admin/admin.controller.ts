import type { Request, Response } from 'express';
import { ApiResponseBuilder } from '../../common/utils/ApiResponse';
import { AdminService } from './admin.service';
import { AuthService } from '../auth/auth.service'; // Import if needed
import { prisma } from '../../config/db.config';

const authService = new AuthService();

const adminService = new AdminService(prisma,authService); // Pass the instantiated AuthService

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