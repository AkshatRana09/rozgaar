import { useState, useEffect } from 'react';
import axios from '../lib/axios';
import toast from 'react-hot-toast';

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('my-jobs');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: { min: '', max: '' },
    jobType: 'full-time',
    experience: 'fresher',
    skills: '',
    openings: 1,
    deadline: ''
  });

  const fetchMyJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/jobs/recruiter/myjobs');
      setJobs(data.jobs || []);
    } catch (error) {
      toast.error('Failed to load your jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'my-jobs') fetchMyJobs();
  }, [activeTab]);

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      await axios.post('/jobs', {
        ...formData,
        skills: skillsArray,
        salary: {
          min: Number(formData.salary.min),
          max: Number(formData.salary.max)
        }
      });
      toast.success('Job posted successfully! 🚀');
      setFormData({
        title: '', description: '', company: '', location: '',
        salary: { min: '', max: '' }, jobType: 'full-time',
        experience: 'fresher', skills: '', openings: 1, deadline: ''
      });
      setActiveTab('my-jobs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Posting failed');
    }
  };

  const handleViewApplicants = async (job) => {
    setSelectedJob(job);
    setApplicantsLoading(true);
    try {
      const { data } = await axios.get(`/applications/job/${job._id}`);
      setApplicants(data.applications || []);
    } catch (error) {
      toast.error('Failed to load applicants');
    } finally {
      setApplicantsLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/jobs/${jobId}`);
      toast.success('Job deleted');
      setJobs(jobs.filter(j => j._id !== jobId));
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await axios.put(`/applications/${applicationId}/status`, { status });
      toast.success(`Status updated to ${status}`);
      setApplicants(applicants.map(a =>
        a._id === applicationId ? { ...a, status } : a
      ));
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      reviewing: 'bg-blue-50 text-blue-600 border-blue-100',
      shortlisted: 'bg-green-50 text-green-600 border-green-200',
      rejected: 'bg-red-50 text-red-600 border-red-200',
      hired: 'bg-purple-50 text-purple-600 border-purple-200'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  // Applicants Modal
  if (selectedJob) {
    return (
      <div className='min-h-screen bg-gray-50/50 pb-20'>
        <div className='max-w-5xl mx-auto px-4 py-12'>
          <button
            onClick={() => setSelectedJob(null)}
            className='flex items-center gap-2 text-gray-500 font-bold mb-8 hover:text-gray-900'
          >
            ← Back to My Jobs
          </button>

          <div className='mb-8'>
            <h1 className='text-2xl font-bold text-gray-900'>Applicants for {selectedJob.title}</h1>
            <p className='text-gray-500 mt-1'>{selectedJob.company} • {selectedJob.location}</p>
          </div>

          {applicantsLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin'></div>
            </div>
          ) : applicants.length > 0 ? (
            <div className='space-y-4'>
              {applicants.map((app, idx) => (
                <div key={app._id} className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex items-start gap-4'>
                      <div className='w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg'>
                        {app.applicant?.name?.charAt(0)}
                      </div>
                      <div>
                        <div className='flex items-center gap-3'>
                          <h3 className='font-bold text-gray-900'>{app.applicant?.name}</h3>
                          {/* AI Score Badge */}
                          <span className={`px-2 py-1 rounded-lg text-xs font-black ${app.aiScore >= 70 ? 'bg-green-50 text-green-600' :
                            app.aiScore >= 40 ? 'bg-yellow-50 text-yellow-600' :
                              'bg-red-50 text-red-600'
                            }`}>
                            AI Score: {app.aiScore}/100
                          </span>
                          {idx === 0 && app.aiScore > 0 && (
                            <span className='px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black'>
                              🏆 Top Match
                            </span>
                          )}
                        </div>
                        <p className='text-sm text-gray-500'>{app.applicant?.email}</p>
                        {app.applicant?.skills?.length > 0 && (
                          <div className='flex flex-wrap gap-1 mt-2'>
                            {app.applicant.skills.map(skill => (
                              <span key={skill} className='px-2 py-0.5 bg-gray-50 text-gray-500 rounded text-xs font-medium border border-gray-100'>
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                        {app.coverLetter && (
                          <p className='text-sm text-gray-400 mt-2 italic'>"{app.coverLetter.substring(0, 100)}..."</p>
                        )}
                        {app.resume && (
                          <a href={app.resume} target="_blank" rel="noreferrer" className='text-xs text-indigo-600 font-bold mt-2 inline-block hover:underline'>
                            📄 View Resume
                          </a>
                        )}
                      </div>
                    </div>

                    <div className='flex flex-col items-end gap-3'>
                      {getStatusBadge(app.status)}
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                        className='text-xs font-bold border border-gray-200 rounded-lg px-3 py-2 outline-none cursor-pointer'
                      >
                        <option value='pending'>Pending</option>
                        <option value='reviewing'>Reviewing</option>
                        <option value='shortlisted'>Shortlisted</option>
                        <option value='rejected'>Rejected</option>
                        <option value='hired'>Hired</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-20 bg-white rounded-3xl border border-gray-100'>
              <p className='text-gray-500 font-bold'>No applicants yet for this job.</p>
            </div>
          )}
        </div>
      </div >
    );
  }

  return (
    <div className='min-h-screen bg-gray-50/50 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>

        {/* Header and Tabs */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-gray-900'>Recruiter Panel</h1>
            <p className='text-gray-500 font-medium'>Manage your active job postings and find top talent.</p>
          </div>

          <div className='flex p-1 bg-gray-100 rounded-xl'>
            <button
              onClick={() => setActiveTab('my-jobs')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'my-jobs' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              My Postings
            </button>
            <button
              onClick={() => setActiveTab('post-job')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'post-job' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Post New Job
            </button>
          </div>
        </div>

        {activeTab === 'my-jobs' ? (
          <div className='space-y-8'>
            {loading ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[1, 2, 3].map(i => <div key={i} className='h-64 bg-white rounded-3xl animate-pulse border border-gray-100'></div>)}
              </div>
            ) : jobs.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {jobs.map(job => (
                  <div key={job._id} className='bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden'>
                    <div className='flex justify-between items-start mb-6'>
                      <div className='w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black text-xl'>
                        {job.title?.charAt(0)}
                      </div>
                      <div className='flex flex-col items-end gap-2'>
                        <span className='px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold'>
                          {job.status}
                        </span>
                        <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>
                          {new Date(job.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <h3 className='text-xl font-bold text-gray-900 mb-1'>{job.title}</h3>
                    <p className='text-sm text-gray-500 font-medium mb-2'>{job.location} • {job.jobType}</p>
                    <p className='text-sm font-bold text-indigo-600 mb-6'>
                      ₹{(job.salary?.min / 100000).toFixed(1)}L - ₹{(job.salary?.max / 100000).toFixed(1)}L
                    </p>

                    <div className='flex items-center justify-between pt-6 border-t border-gray-50'>
                      <div>
                        <p className='text-xs text-gray-400 font-bold uppercase'>Deadline</p>
                        <p className='text-sm font-bold text-gray-700'>
                          {new Date(job.deadline).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <button
                        onClick={() => handleViewApplicants(job)}
                        className='bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition'
                      >
                        View Applicants
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className='absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all'
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm'>
                <p className='text-gray-500 font-bold'>You haven't posted any jobs yet.</p>
                <button onClick={() => setActiveTab('post-job')} className='text-indigo-600 font-bold hover:underline mt-2'>
                  Post your first job now →
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-xl'>
            <div className='mb-12'>
              <h2 className='text-2xl font-bold text-gray-900'>Post a New Role 🚀</h2>
              <p className='text-gray-500 font-medium'>Provide clear details to attract the best talent in India.</p>
            </div>

            <form onSubmit={handlePostJob} className='space-y-10'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8'>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Position Title</label>
                  <input
                    type='text' placeholder='e.g. Lead Frontend Engineer'
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-900'
                    value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Company Name</label>
                  <input
                    type='text' placeholder='e.g. TechCorp India'
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-900'
                    value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Location</label>
                  <input
                    type='text' placeholder='e.g. Bangalore or Remote'
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-900'
                    value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Min Salary (₹)</label>
                  <input
                    type='number' placeholder='e.g. 400000'
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-900'
                    value={formData.salary.min} onChange={e => setFormData({ ...formData, salary: { ...formData.salary, min: e.target.value } })} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Max Salary (₹)</label>
                  <input
                    type='number' placeholder='e.g. 800000'
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-900'
                    value={formData.salary.max} onChange={e => setFormData({ ...formData, salary: { ...formData.salary, max: e.target.value } })} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Job Type</label>
                  <select
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-900 outline-none focus:border-indigo-500 cursor-pointer'
                    value={formData.jobType} onChange={e => setFormData({ ...formData, jobType: e.target.value })}
                  >
                    <option value='full-time'>Full-time</option>
                    <option value='part-time'>Part-time</option>
                    <option value='contract'>Contract</option>
                    <option value='internship'>Internship</option>
                    <option value='remote'>Remote</option>
                  </select>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Experience</label>
                  <select
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-900 outline-none focus:border-indigo-500 cursor-pointer'
                    value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })}
                  >
                    <option value='fresher'>Fresher</option>
                    <option value='1-2 years'>1-2 years</option>
                    <option value='2-5 years'>2-5 years</option>
                    <option value='5+ years'>5+ years</option>
                  </select>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Openings</label>
                  <input
                    type='number' placeholder='e.g. 3' min='1'
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-900'
                    value={formData.openings} onChange={e => setFormData({ ...formData, openings: e.target.value })} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Application Deadline</label>
                  <input
                    type='date'
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-900'
                    value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Required Skills</label>
                  <input
                    type='text' placeholder='React, Node.js, AWS (comma separated)'
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-900'
                    value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} required
                  />
                </div>
              </div>

              <div className='space-y-1'>
                <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Detailed Description</label>
                <textarea
                  placeholder='Describe the role, responsibilities, and ideal candidate...' rows='6'
                  className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 leading-relaxed'
                  value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required
                ></textarea>
              </div>

              <div className='flex items-center justify-end gap-4 pt-6'>
                <button type='button' onClick={() => setActiveTab('my-jobs')} className='px-10 py-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50'>
                  Cancel
                </button>
                <button type='submit' className='bg-indigo-600 text-white px-12 py-4 rounded-xl font-bold hover:bg-indigo-700 transition'>
                  Publish Listing 📢
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;