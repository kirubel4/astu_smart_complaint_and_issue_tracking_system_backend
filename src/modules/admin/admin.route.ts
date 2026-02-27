import { Router } from 'express';
import { AdminController } from './admin.controller';
const adminRouter = Router();

adminRouter.post('/users', AdminController.createNewUser);
adminRouter.get('/users', AdminController.getAllUsers);       
adminRouter.get('/users/:id', AdminController.getUserByID);   
adminRouter.put('/users/:id/role', AdminController.updateUserRole); 
adminRouter.delete('/users/:id', AdminController.removeUser);  
adminRouter.get('/complaints', AdminController.getAllComplaints);
adminRouter.get('/complaints/:id', AdminController.getComplaintById);
adminRouter.post('/complaints/assign', AdminController.assignComplaintToStaff);
adminRouter.post('/complaints/reassign', AdminController.reassignComplaint);
adminRouter.post('/complaints/status', AdminController.updateComplaintStatus);
adminRouter.delete('/complaints/:id', AdminController.deleteComplaint);
adminRouter.get('/complaints-analytics', AdminController.getComplaintAnalytics);

export default adminRouter;