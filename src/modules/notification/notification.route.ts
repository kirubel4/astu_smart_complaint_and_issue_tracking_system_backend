import { Router } from "express";
import { NotificationController } from "./notification.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

// Get all notifications of logged user
router.get("/", authMiddleware, NotificationController.getMyNotifications);

// Mark one notification as read
router.patch("/:id/read", authMiddleware, NotificationController.markAsRead);

export default router;