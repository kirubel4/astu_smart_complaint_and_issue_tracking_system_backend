import { Router } from "express";
import { StudentController } from "./student.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const studentRouter = Router();

// All student routes require authentication
studentRouter.get("/profile", authMiddleware, StudentController.getProfile);

studentRouter.put("/profile", authMiddleware, StudentController.updateProfile);

studentRouter.get("/my-complaints", authMiddleware, StudentController.getMyComplaints);

export default studentRouter;