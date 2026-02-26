// staff.router.ts
import { Router } from "express";
import { StaffController } from "../staff/staff.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const staffRouter = Router();

// Only STAFF role is allowed
staffRouter.get("/assigned", authMiddleware, StaffController.getAssigned);

staffRouter.get("/assigned/:id", authMiddleware, StaffController.getComplaint);

staffRouter.patch("/assigned/:id/status", authMiddleware, StaffController.updateStatus);

staffRouter.post("/assigned/:id/remark", authMiddleware, StaffController.addRemark);

export default staffRouter;