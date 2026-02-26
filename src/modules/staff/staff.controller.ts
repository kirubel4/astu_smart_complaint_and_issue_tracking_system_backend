// staff.controller.ts
import type { Request, Response } from "express";
import { StaffService } from "./staff.service";
import { ApiResponseBuilder } from "../../common/util/ApiResponse";

const staffService = new StaffService();

export class StaffController {
  // List assigned complaints
  static async getAssigned(req: Request, res: Response) {
    try {
      const staffId = req.user?.id;
      const role = req.user?.role;
      if (!staffId || !role) {
        return new ApiResponseBuilder().unauthorized("Unauthorized").build(res);
      }

      const result = await staffService.getAssignedComplaints(staffId);
      return new ApiResponseBuilder()
        .ok("Assigned complaints retrieved")
        .withData(result)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Get specific complaint
  static async getComplaint(req: Request, res: Response) {
    try {
      const staffId = req.user?.id;
      const role = req.user?.role;
      if (!staffId || !role) {
        return new ApiResponseBuilder().unauthorized("Unauthorized").build(res);
      }

      const complaintId = req.params.id;
      if (!complaintId || typeof complaintId !== "string" || complaintId.trim() === "") {
        return new ApiResponseBuilder().badRequest("Invalid complaint id").build(res);
      }

      const result = await staffService.getComplaintById(staffId, role, complaintId);

      if (!result) {
        // Not found or not accessible (policy-driven)
        return new ApiResponseBuilder().notFound("Complaint not found").build(res);
      }

      return new ApiResponseBuilder()
        .ok("Complaint retrieved")
        .withData(result)
        .build(res);

    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Update status
  static async updateStatus(req: Request, res: Response) {
    try {
      const staffId = req.user?.id;
      const role = req.user?.role;
      if (!staffId || !role) {
        return new ApiResponseBuilder().unauthorized("Unauthorized").build(res);
      }

      const complaintId = req.params.id;
      const { status } = req.body;

      if (!complaintId || typeof complaintId !== "string" || complaintId.trim() === "") {
        return new ApiResponseBuilder().badRequest("Invalid complaint id").build(res);
      }

      const result = await staffService.updateStatus(staffId, complaintId, status);

      return new ApiResponseBuilder()
        .ok("Status updated")
        .withData(result)
        .build(res);

    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Add remark
  static async addRemark(req: Request, res: Response) {
    try {
      const staffId = req.user?.id;
      const role = req.user?.role;
      if (!staffId || !role) {
        return new ApiResponseBuilder().unauthorized("Unauthorized").build(res);
      }

      const complaintId = req.params.id;
      const { message } = req.body;

      if (!complaintId || typeof complaintId !== "string" || complaintId.trim() === "") {
        return new ApiResponseBuilder().badRequest("Invalid complaint id").build(res);
      }

      const result = await staffService.addRemark(staffId, complaintId, message);

      return new ApiResponseBuilder()
        .created("Remark added")
        .withData(result)
        .build(res);

    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }
}