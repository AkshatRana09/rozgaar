import express from 'express';
import {
    applyJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus,
    withdrawApplication
} from '../controllers/applicationController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Seeker routes
router.post('/:jobId', protect, authorizeRoles('seeker'), applyJob);
router.get('/my', protect, authorizeRoles('seeker'), getMyApplications);
router.delete('/:id', protect, authorizeRoles('seeker'), withdrawApplication);

// Recruiter routes
router.get('/job/:jobId', protect, authorizeRoles('recruiter', 'admin'), getJobApplications);
router.put('/:id/status', protect, authorizeRoles('recruiter', 'admin'), updateApplicationStatus);

export default router;