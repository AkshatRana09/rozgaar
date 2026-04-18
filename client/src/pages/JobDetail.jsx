import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`/jobs/${id}`);
        setJob(data.job);
        // Check if user already applied (assuming we have this logic or status in user data)
        // For now, let's keep it simple
      } catch (error) {
        toast.error('Job details not found');
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    
    setApplying(true);
    try {
      await axios.post(`/applications/${id}`, { coverLetter });
      toast.success('Application sent! 🚀');
      setApplied(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Apply failed');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin'></div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50/50 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col lg:flex-row gap-12'>
          
          {/* Left Column: Job Content */}
          <div className='lg:w-2/3 space-y-8'>
            <div className='bg-white p-10 rounded-3xl border border-gray-100 shadow-sm'>
              <div className='flex items-start gap-6 mb-10'>
                <div className='w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black text-2xl'>
                  {job.companyName?.charAt(0)}
                </div>
                <div className='space-y-2'>
                  <h1 className='text-4xl font-bold text-gray-900 tracking-tight'>{job.title}</h1>
                  <p className='text-xl text-gray-500 font-medium'>{job.companyName} • {job.location}</p>
                </div>
              </div>

              <div className='flex flex-wrap gap-3 mb-12'>
                <span className='badge badge-info'>{job.jobType}</span>
                <span className='badge bg-gray-100 text-gray-500 border-gray-200 uppercase'>Active</span>
              </div>

              <div className='prose prose-gray max-w-none'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>About the Role</h3>
                <p className='text-gray-600 leading-relaxed whitespace-pre-line'>
                  {job.description}
                </p>
              </div>

              <div className='mt-12 space-y-6'>
                <h3 className='text-xl font-bold text-gray-900'>Technical Stack</h3>
                <div className='flex flex-wrap gap-3'>
                  {job.skills?.map(skill => (
                    <span key={skill} className='px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold border border-gray-100'>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Apply Card */}
          <div className='lg:w-1/3'>
            <div className='bg-white p-8 rounded-3xl border border-gray-100 shadow-xl sticky top-24'>
              <div className='space-y-6'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='p-4 bg-gray-50 rounded-2xl border border-gray-100'>
                    <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1'>Annual Salary</p>
                    <p className='text-lg font-bold text-gray-900'>₹{(job.salary / 100000).toFixed(1)}L+</p>
                  </div>
                  <div className='p-4 bg-gray-50 rounded-2xl border border-gray-100'>
                    <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1'>Openings</p>
                    <p className='text-lg font-bold text-gray-900'>03 Slots</p>
                  </div>
                </div>

                <div className='pt-6 border-t border-gray-50'>
                  {applied ? (
                    <div className='bg-success/5 border border-success/20 p-6 rounded-2xl text-center'>
                      <p className='text-success font-bold flex items-center justify-center gap-2'>
                        <span className='text-xl'>✓</span> Application Sent
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className='space-y-4'>
                      <div className='space-y-2'>
                        <label className='text-xs font-bold text-gray-700 ml-1'>Cover Letter / Pitch</label>
                        <textarea 
                          placeholder='Why are you a good fit? (Briefly explain your relevant experience)' 
                          rows='5'
                          className='w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-primary outline-none transition-all'
                          value={coverLetter}
                          onChange={e => setCoverLetter(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <button 
                        type='submit' 
                        disabled={applying}
                        className='w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-[0.98]'
                      >
                        {applying ? 'Sending...' : 'Apply Now ⚡'}
                      </button>
                    </form>
                  )}
                </div>

                <div className='pt-6'>
                  <p className='text-[10px] font-black text-center text-gray-400 uppercase tracking-[0.2em] mb-4'>Hiring Timeline</p>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-2 h-2 bg-primary rounded-full'></div>
                      <p className='text-xs font-bold text-gray-900'>Application Review</p>
                      <span className='ml-auto text-[10px] text-gray-400 font-bold'>WEEK 1</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-2 h-2 bg-gray-200 rounded-full'></div>
                      <p className='text-xs font-bold text-gray-400'>Technical Interview</p>
                      <span className='ml-auto text-[10px] text-gray-400 font-bold'>WEEK 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;