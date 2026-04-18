import express from 'express';
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
} from '../controllers/jobController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Recruiter only routes
router.post('/', protect, authorizeRoles('recruiter', 'admin'), createJob);
router.put('/:id', protect, authorizeRoles('recruiter', 'admin'), updateJob);
router.delete('/:id', protect, authorizeRoles('recruiter', 'admin'), deleteJob);
router.get('/recruiter/myjobs', protect, authorizeRoles('recruiter', 'admin'), getMyJobs);

export default router;