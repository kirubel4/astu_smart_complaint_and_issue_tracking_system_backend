import type { Request, Response } from 'express';
import { ApiResponseBuilder } from '../../common/util/ApiResponse';
import { ComplaintService } from './complaint.service';
import { prisma } from '../../config/db.config';

const complaintService = new ComplaintService(prisma);

// helper to ensure a single string param
function ensureString(param: unknown, name: string): string {
  if (typeof param === 'string' && param.trim() !== '') return param;
  throw new Error(`Missing or invalid ${name}`);
}

export class ComplaintController {
  // Create a complaint for a student
  static async createComplaint(req: Request, res: Response) {
    try {
      const studentId = ensureString(req.params.studentId, 'studentId');
      const { title, description, categoryId, attachment } = req.body;

      const data = { title, description, categoryId, attachment };
      const result = await complaintService.createComplaint(studentId, data);

      return new ApiResponseBuilder()
        .created('Complaint created successfully')
        .withData(result)
        .build(res);
    } catch (error: any) {
      const message = error?.message ?? 'Server error';
      // If ensureString threw, it's a bad request
      if (message.includes('Missing or invalid')) {
        return new ApiResponseBuilder().badRequest(message).build(res);
      }
      return new ApiResponseBuilder().internalError(message).build(res);
    }
  }

  // Get my complaints
  static async getMyComplaints(req: Request, res: Response) {
    try {
      const studentId = ensureString(req.params.studentId, 'studentId');
      const results = await complaintService.getMyComplaints(studentId);

      return new ApiResponseBuilder()
        .ok('Complaints retrieved successfully')
        .withData(results)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Get a specific complaint for a student
  static async getComplaintByIdForStudent(req: Request, res: Response) {
    try {
      const id = ensureString(req.params.id, 'id');
      const studentId = ensureString(req.params.studentId, 'studentId');
      const result = await complaintService.getComplaintByIdForStudent(id, studentId);

      if (!result) {
        return new ApiResponseBuilder().badRequest('Complaint not found').build(res);
      }

      return new ApiResponseBuilder()
        .ok('Complaint retrieved successfully')
        .withData(result)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Update a student's complaint
  static async updateMyComplaint(req: Request, res: Response) {
    try {
      const id = ensureString(req.params.id, 'id');
      const studentId = ensureString(req.params.studentId, 'studentId');
      const data = req.body;

      const result = await complaintService.updateMyComplaint(id, studentId, data);

      return new ApiResponseBuilder()
        .ok('Complaint updated successfully')
        .withData(result)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Delete a student's complaint
  static async deleteMyComplaint(req: Request, res: Response) {
    try {
      const id = ensureString(req.params.id, 'id');
      const studentId = ensureString(req.params.studentId, 'studentId');
      const result = await complaintService.deleteMyComplaint(id, studentId);

      return new ApiResponseBuilder()
        .ok('Complaint deleted successfully')
        .withData(result)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Get complaints assigned to a staff member
  static async getAssignedComplaints(req: Request, res: Response) {
    try {
      const staffId = ensureString(req.params.staffId, 'staffId');
      const results = await complaintService.getAssignedComplaints(staffId);

      return new ApiResponseBuilder()
        .ok('Assigned complaints retrieved successfully')
        .withData(results)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Update status of a complaint
  static async updateStatus(req: Request, res: Response) {
    try {
      const staffId = ensureString(req.params.staffId, 'staffId');
      const id = ensureString(req.params.id, 'id');
      const { status } = req.body;

      const result = await complaintService.updateStatus(staffId, id, status);

      return new ApiResponseBuilder()
        .ok('Complaint status updated successfully')
        .withData(result)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Add a remark to a complaint
  static async addRemark(req: Request, res: Response) {
    try {
      const staffId = ensureString(req.params.staffId, 'staffId');
      const id = ensureString(req.params.id, 'id');
      const { message } = req.body;

      const result = await complaintService.addRemark(staffId, id, message);

      return new ApiResponseBuilder()
        .created('Remark added successfully')
        .withData(result)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }
}