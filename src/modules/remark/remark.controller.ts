// remark.controller.ts
import type { Request, Response } from 'express';
import { ApiResponseBuilder } from '../../common/util/ApiResponse';
import { RemarkService } from './remark.service';

const remarkService = new RemarkService();

// Add remark (STAFF) - no req.user assumed
export class RemarkController {
  static async addRemark(req: Request, res: Response) {
  try {
    // Body-first staffId, then header fallback
    const bodyStaffId = (req.body as any)?.staffId;
    const headerStaffId = (req.headers['x-staff-id'] as string) || '';
    const staffId = (typeof bodyStaffId === 'string' && bodyStaffId.trim())
      ? bodyStaffId.trim()
      : (headerStaffId ? headerStaffId.trim() : '');

    if (!staffId) {
      return new ApiResponseBuilder().unauthorized('Missing staff id in header or body').build(res);
    }

    const { complaintId } = req.params;
    const { message } = req.body;

    if (!complaintId || typeof complaintId !== 'string' || complaintId.trim() === '') {
      return new ApiResponseBuilder().badRequest('Invalid complaintId').build(res);
    }
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return new ApiResponseBuilder().badRequest('message is required').build(res);
    }

    const remark = await remarkService.addRemark(staffId, complaintId, message.trim());

    return new ApiResponseBuilder()
      .created('Remark added successfully')
      .withData(remark)
      .build(res);
  } catch (error: any) {
    return new ApiResponseBuilder().internalError(error.message).build(res);
  }
}

  // Get all remarks for a complaint
  static async getRemarks(req: Request, res: Response) {
    try {
      const { complaintId } = req.params;
      if (!complaintId || typeof complaintId !== 'string' || complaintId.trim() === '') {
        return new ApiResponseBuilder().badRequest('Invalid complaintId').build(res);
      }

      const remarks = await remarkService.getRemarksForComplaint(complaintId);
      return new ApiResponseBuilder().ok('Remarks retrieved successfully').withData(remarks).build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Delete remark (Admin / Staff)
  static async deleteRemark(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string' || id.trim() === '') {
        return new ApiResponseBuilder().badRequest('Invalid remark id').build(res);
      }

      await remarkService.deleteRemark(id);

      return new ApiResponseBuilder().ok('Remark deleted successfully').build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }
}