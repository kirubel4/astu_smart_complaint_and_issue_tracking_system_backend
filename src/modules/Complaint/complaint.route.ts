import { Router } from 'express';
import { ComplaintController } from '../Complaint/complaint.controller';

const ComplaintRouter = Router();

// Create a complaint for a student
ComplaintRouter.post('/students/:studentId/complaints', ComplaintController.createComplaint);

// Get current student's complaints
ComplaintRouter.get('/students/:studentId/complaints', ComplaintController.getMyComplaints);

// Get a specific complaint for a student
ComplaintRouter.get('/students/:studentId/complaints/:id', ComplaintController.getComplaintByIdForStudent);

// Update a student's complaint
ComplaintRouter.put('/students/:studentId/complaints/:id', ComplaintController.updateMyComplaint);

// Delete a student's complaint
ComplaintRouter.delete('/students/:studentId/complaints/:id', ComplaintController.deleteMyComplaint);

// Get complaints assigned to a staff member
ComplaintRouter.get('/staff/:staffId/complaints', ComplaintController.getAssignedComplaints);

// Update status of a complaint
ComplaintRouter.put('/staff/:staffId/complaints/:id/status', ComplaintController.updateStatus);

// Add a remark to a complaint
ComplaintRouter.post('/staff/:staffId/complaints/:id/remarks', ComplaintController.addRemark);

export default ComplaintRouter;