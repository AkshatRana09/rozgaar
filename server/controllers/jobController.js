import Job from '../models/Job.js';

// @POST /api/jobs - Create job (recruiter only)
export const createJob = async (req, res) => {
    try {
        const job = await Job.create({ ...req.body, postedBy: req.user._id });
        res.status(201).json({ success: true, job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @GET /api/jobs - Get all open jobs (public)
export const getAllJobs = async (req, res) => {
    try {
        const { search, location, jobType, experience, page = 1, limit = 10 } = req.query;

        const query = { status: 'open' };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { skills: { $regex: search, $options: 'i' } }
            ];
        }

        if (location) query.location = { $regex: location, $options: 'i' };
        if (jobType) query.jobType = jobType;
        if (experience) query.experience = experience;

        const skip = (page - 1) * limit;
        const total = await Job.countDocuments(query);
        const jobs = await Job.find(query)
            .populate('postedBy', 'name email avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            jobs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @GET /api/jobs/:id - Get single job (public)
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('postedBy', 'name email avatar company');

        if (!job) {
            return res.status(404).json({ message: '❌ Job not found' });
        }

        res.status(200).json({ success: true, job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @PUT /api/jobs/:id - Update job (recruiter only)
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: '❌ Job not found' });
        }

        // Only the recruiter who posted can update
        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: '❌ Not authorized to update this job' });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @DELETE /api/jobs/:id - Delete job (recruiter only)
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: '❌ Job not found' });
        }

        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: '❌ Not authorized to delete this job' });
        }

        await job.deleteOne();
        res.status(200).json({ success: true, message: '✅ Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @GET /api/jobs/recruiter/myjobs - Get recruiter's own jobs
export const getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};