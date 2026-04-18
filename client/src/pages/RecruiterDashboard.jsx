import { useState, useEffect } from 'react';
import axios from '../lib/axios';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const RecruiterDashboard = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('my-jobs');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '', description: '', companyName: '', location: '', salary: '', jobType: 'Full-time', skills: ''
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
      await axios.post('/jobs', { ...formData, skills: skillsArray });
      toast.success('Job posted successfully! 🚀');
      setFormData({ title: '', description: '', companyName: '', location: '', salary: '', jobType: 'Full-time', skills: '' });
      setActiveTab('my-jobs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Posting failed');
    }
  };

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
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'my-jobs' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              My Postings
            </button>
            <button 
              onClick={() => setActiveTab('post-job')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'post-job' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Post New Job
            </button>
          </div>
        </div>

        {activeTab === 'my-jobs' ? (
          <div className='space-y-8'>
            {loading ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[1,2,3].map(i => <div key={i} className='h-64 bg-white rounded-3xl animate-pulse border border-gray-100'></div>)}
              </div>
            ) : jobs.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {jobs.map(job => (
                  <div key={job._id} className='bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/20 transition-all group relative overflow-hidden'>
                    <div className='flex justify-between items-start mb-6'>
                      <div className='w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black text-xl'>
                        {job.title?.charAt(0)}
                      </div>
                      <div className='flex flex-col items-end gap-2'>
                         <span className='badge badge-success'>Open</span>
                         <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>Posted 2d ago</span>
                      </div>
                    </div>
                    
                    <h3 className='text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-1'>{job.title}</h3>
                    <p className='text-sm text-gray-500 font-medium mb-6'>{job.location} • {job.jobType}</p>
                    
                    <div className='flex items-center justify-between pt-6 border-t border-gray-50'>
                      <div>
                        <p className='text-2xl font-black text-gray-900'>12</p>
                        <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>Applicants</p>
                      </div>
                      <button className='btn-primary px-4 py-2 text-xs'>View All</button>
                    </div>

                    <div className='absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity'>
                       <button className='text-gray-400 hover:text-danger'>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm'>
                <p className='text-gray-500 font-bold'>You haven't posted any jobs yet.</p>
                <button onClick={() => setActiveTab('post-job')} className='text-primary font-bold hover:underline mt-2'>Post your first job now →</button>
              </div>
            )}
          </div>
        ) : (
          <div className='bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20'>
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
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-gray-900'
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Company Name</label>
                  <input 
                    type='text' placeholder='e.g. Rozgaar Inc.' 
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-gray-900'
                    value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Location</label>
                  <input 
                    type='text' placeholder='e.g. Bangalore or Remote' 
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-gray-900'
                    value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Annual Salary (₹)</label>
                  <input 
                    type='number' placeholder='e.g. 1800000' 
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-gray-900'
                    value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} required
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Job Category</label>
                  <select 
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-900 outline-none focus:border-primary cursor-pointer'
                    value={formData.jobType} onChange={e => setFormData({...formData, jobType: e.target.value})}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Required Skills</label>
                  <input 
                    type='text' placeholder='React, Node.js, AWS (comma separated)' 
                    className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-bold text-gray-900'
                    value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} required
                  />
                </div>
              </div>

              <div className='space-y-1'>
                <label className='text-xs font-black uppercase tracking-widest text-gray-400 ml-1'>Detailed Description</label>
                <textarea 
                  placeholder='Describe the role, impact, and ideal candidate...' rows='8'
                  className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[2rem] focus:bg-white focus:border-primary outline-none transition-all font-medium text-gray-900 leading-relaxed'
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required
                ></textarea>
              </div>

              <div className='flex items-center justify-end gap-4 pt-6'>
                <button type='button' onClick={() => setActiveTab('my-jobs')} className='btn-ghost px-10'>Cancel</button>
                <button type='submit' className='btn-primary px-12 py-4'>Publish Listing 📢</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;