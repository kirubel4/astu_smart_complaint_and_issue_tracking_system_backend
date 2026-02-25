import { Router } from 'express';
import { ComplaintController } from '../Complaint/complaint.controller';

const router = Router();

// Create a complaint for a student
router.post('/students/:studentId/complaints', ComplaintController.createComplaint);

// Get current student's complaints
router.get('/students/:studentId/complaints', ComplaintController.getMyComplaints);

// Get a specific complaint for a student
router.get('/students/:studentId/complaints/:id', ComplaintController.getComplaintByIdForStudent);

// Update a student's complaint
router.put('/students/:studentId/complaints/:id', ComplaintController.updateMyComplaint);

// Delete a student's complaint
router.delete('/students/:studentId/complaints/:id', ComplaintController.deleteMyComplaint);

// Get complaints assigned to a staff member
router.get('/staff/:staffId/complaints', ComplaintController.getAssignedComplaints);

// Update status of a complaint
router.put('/staff/:staffId/complaints/:id/status', ComplaintController.updateStatus);

// Add a remark to a complaint
router.post('/staff/:staffId/complaints/:id/remarks', ComplaintController.addRemark);

export default router;