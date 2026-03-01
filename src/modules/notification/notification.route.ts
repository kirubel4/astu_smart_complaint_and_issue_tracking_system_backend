import { Router } from "express";
import { NotificationController } from "./notification.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const notificationRouter = Router();

notificationRouter.post("/", authMiddleware, NotificationController.createNotification);
// Get all notifications of logged user
notificationRouter.get("/", authMiddleware, NotificationController.getMyNotifications);

// Mark one notification as read
notificationRouter.patch("/:id/read", authMiddleware, NotificationController.markAsRead);

export default notificationRouter;