import cloudinary from '../utils/cloudinary.js';
import User from '../models/User.js';

// @POST /api/upload/resume
export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: '❌ No file uploaded' });
        }

        // Convert buffer to base64
        const fileStr = `data:application/pdf;base64,${req.file.buffer.toString('base64')}`;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'rozgaar/resumes',
            resource_type: 'raw',
            public_id: `resume_${req.user._id}_${Date.now()}`,
            format: 'pdf'
        });

        // Save URL to user profile
        await User.findByIdAndUpdate(req.user._id, {
            resume: uploadResponse.secure_url
        });

        res.status(200).json({
            success: true,
            message: '✅ Resume uploaded successfully',
            resumeUrl: uploadResponse.secure_url
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @POST /api/upload/avatar
export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: '❌ No file uploaded' });
        }

        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'rozgaar/avatars',
            transformation: [
                { width: 200, height: 200, crop: 'fill', gravity: 'face' }
            ]
        });

        await User.findByIdAndUpdate(req.user._id, {
            avatar: uploadResponse.secure_url
        });

        res.status(200).json({
            success: true,
            message: '✅ Avatar uploaded successfully',
            avatarUrl: uploadResponse.secure_url
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};