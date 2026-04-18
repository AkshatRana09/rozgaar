import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Job description is required']
    },
    company: {
        type: String,
        required: [true, 'Company name is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'remote', 'contract'],
        default: 'full-time'
    },
    salary: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
        currency: { type: String, default: 'INR' }
    },
    skills: [String],
    experience: {
        type: String,
        enum: ['fresher', '1-2 years', '2-5 years', '5+ years'],
        default: 'fresher'
    },
    openings: {
        type: Number,
        default: 1
    },
    deadline: {
        type: Date,
        required: [true, 'Application deadline is required']
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'paused'],
        default: 'open'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;