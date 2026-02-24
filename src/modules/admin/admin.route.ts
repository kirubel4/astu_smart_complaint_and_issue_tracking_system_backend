import { Router } from 'express';
import { AdminController } from './admin.controller';
const router = Router();

router.get('/complaints', AdminController.getAllComplaints);
router.get('/complaints/:id', AdminController.getComplaintById);
router.post('/complaints/assign', AdminController.assignComplaintToStaff);
router.post('/complaints/reassign', AdminController.reassignComplaint);
router.post('/complaints/status', AdminController.updateComplaintStatus);
router.delete('/complaints/:id', AdminController.deleteComplaint);
router.get('/complaints-analytics', AdminController.getComplaintAnalytics);

export default router;