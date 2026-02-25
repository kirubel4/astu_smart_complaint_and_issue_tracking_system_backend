import type { Request, Response } from 'express';
import { ApiResponseBuilder } from '../../common/util/ApiResponse';
import { StudentService } from './student.service';

const studentService = new StudentService();

// Get profile
export class StudentController {
  static async getProfile(req: Request, res: Response) {
    try {
      const studentId = req.user?.id;
      if (!studentId) {
        return new ApiResponseBuilder().unauthorized('Unauthorized: missing user').build(res);
      }

      const result = await studentService.getProfile(studentId);

      return new ApiResponseBuilder()
        .ok('Profile retrieved successfully')
        .withData(result)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // Update profile
  static async updateProfile(req: Request, res: Response) {
    try {
      const studentId = req.user?.id;
      if (!studentId) {
        return new ApiResponseBuilder().unauthorized('Unauthorized: missing user').build(res);
      }

      const result = await studentService.updateProfile(studentId, req.body);

      return new ApiResponseBuilder()
        .ok('Profile updated successfully')
        .withData(result)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }

  // View complaint history
  static async getMyComplaints(req: Request, res: Response) {
    try {
      const studentId = req.user?.id;
      if (!studentId) {
        return new ApiResponseBuilder().unauthorized('Unauthorized: missing user').build(res);
      }

      const result = await studentService.getMyComplaints(studentId);

      return new ApiResponseBuilder()
        .ok('Complaints retrieved successfully')
        .withData(result)
        .build(res);
    } catch (error: any) {
      return new ApiResponseBuilder().internalError(error.message).build(res);
    }
  }
}