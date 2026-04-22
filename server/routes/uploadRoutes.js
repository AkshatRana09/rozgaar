import express from 'express';
import { uploadResume, uploadAvatar } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/resume', protect, upload.single('resume'), uploadResume);
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);

export default router;