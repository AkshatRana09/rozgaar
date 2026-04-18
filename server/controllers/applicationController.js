import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { io } from '../index.js';

// @POST /api/applications/:jobId - Apply for a job (seeker only)
export const applyJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { coverLetter, resume } = req.body;

        // Check job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: '❌ Job not found' });
        }

        // Check job is open
        if (job.status !== 'open') {
            return res.status(400).json({ message: '❌ This job is no longer accepting applications' });
        }

        // Check deadline
        if (new Date(job.deadline) < new Date()) {
            return res.status(400).json({ message: '❌ Application deadline has passed' });
        }

        // Check already applied
        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: req.user._id
        });
        if (alreadyApplied) {
            return res.status(400).json({ message: '❌ You have already applied for this job' });
        }

        // Create application
        const application = await Application.create({
            job: jobId,
            applicant: req.user._id,
            recruiter: job.postedBy,
            resume: resume || req.user.resume,
            coverLetter
        });

        // Notify recruiter in real-time
        io.to(job.postedBy.toString()).emit('newApplication', {
            message: `New application received for ${job.title}`,
            applicationId: application._id
        });

        res.status(201).json({ success: true, application });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: '❌ You have already applied for this job' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @GET /api/applications/my - Get seeker's own applications
export const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user._id })
            .populate('job', 'title company location jobType salary status')
            .populate('recruiter', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @GET /api/applications/job/:jobId - Get all applications for a job (recruiter only)
export const getJobApplications = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).json({ message: '❌ Job not found' });
        }

        // Only the recruiter who posted can see applications
        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: '❌ Not authorized' });
        }

        const applications = await Application.find({ job: req.params.jobId })
            .populate('applicant', 'name email avatar phone skills bio resume')
            .sort({ aiScore: -1, createdAt: -1 });

        res.status(200).json({ success: true, applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @PUT /api/applications/:id/status - Update application status (recruiter only)
export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const application = await Application.findById(req.params.id)
            .populate('job', 'title');

        if (!application) {
            return res.status(404).json({ message: '❌ Application not found' });
        }

        // Only recruiter of this job can update
        if (application.recruiter.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: '❌ Not authorized' });
        }

        application.status = status;
        await application.save();

        // Notify applicant in real-time
        io.to(application.applicant.toString()).emit('applicationUpdate', {
            message: `Your application for ${application.job.title} has been ${status}`,
            status,
            applicationId: application._id
        });

        res.status(200).json({ success: true, application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @DELETE /api/applications/:id - Withdraw application (seeker only)
export const withdrawApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: '❌ Application not found' });
        }

        if (application.applicant.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: '❌ Not authorized' });
        }

        await application.deleteOne();
        res.status(200).json({ success: true, message: '✅ Application withdrawn' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};