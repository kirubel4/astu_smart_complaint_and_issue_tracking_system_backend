import adminRouter from "../modules/admin/admin.route";
import { Router } from "express";
import ComplaintRouter from "../modules/Complaint/complaint.route";
import categoryRouter from "../modules/category/category.route";
import remarkRouter from "../modules/remark/remark.route";
import StudentRouter from "../modules/student/student.route";
import authRouter from "../modules/auth/auth.route";
import staffRouter from "../modules/staff/staff.route";
import notificationRouter from "../modules/notification/notification.route";
const apiRouter = Router();

apiRouter.use("/auth", authRouter)
apiRouter.use("/admin", adminRouter)
apiRouter.use("/complaint", ComplaintRouter)
apiRouter.use("/category", categoryRouter)
apiRouter.use("/remark", remarkRouter)
apiRouter.use("/student", StudentRouter)
apiRouter.use("/staff", staffRouter)
apiRouter.use("/notification", notificationRouter)
export default apiRouter;