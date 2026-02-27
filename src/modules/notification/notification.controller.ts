import type { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import { ApiResponseBuilder } from "../../common/util/ApiResponse";

const notificationService = new NotificationService();

export class NotificationController {
  static async getMyNotifications(req: Request, res: Response) {
    try {
      const userId = req.user?.id!;
      const data = await notificationService.getMyNotifications(userId);

      return new ApiResponseBuilder().ok("Notifications fetched").withData(data).build(res);
    } catch (err: any) {
      return new ApiResponseBuilder().internalError(err.message).build(res);
    }
  }

  static async markAsRead(req: Request, res: Response) {
    try {
      const userId = req.user?.id!;
      const { id } = req.params;
      if (typeof id !== "string") {
        return new ApiResponseBuilder().badRequest("Invalid notification id").build(res);
      }

      const data = await notificationService.markAsRead(id, userId);

      return new ApiResponseBuilder().ok("Marked as read").withData(data).build(res);
    } catch (err: any) {
      return new ApiResponseBuilder().internalError(err.message).build(res);
    }
  }
}