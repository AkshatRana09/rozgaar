import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../lib/axios';
import toast from 'react-hot-toast';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ jobType: '', location: '', experience: '' });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/jobs', { params: { search, ...filters } });
      setJobs(data.jobs || []);
    } catch (error) {
      toast.error('Could not fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className='min-h-screen bg-gray-50/50'>
      {/* Top Search Header */}
      <section className='bg-white border-b border-gray-100 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <form onSubmit={handleSearch} className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1 relative'>
              <span className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-400'>🔍</span>
              <input 
                type='text' 
                placeholder='Search by role, company, or tech stack...' 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className='w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-medium'
              />
            </div>
            <button type='submit' className='btn-primary px-10'>Search</button>
          </form>
        </div>
      </section>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col lg:flex-row gap-10'>
          
          {/* Sticky Sidebar Filters */}
          <aside className='lg:w-1/4 space-y-8'>
            <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24'>
              <h3 className='text-sm font-black uppercase tracking-widest text-gray-400 mb-6'>Filters</h3>
              
              <div className='space-y-6'>
                <div>
                  <label className='text-xs font-bold text-gray-700 block mb-2'>Job Type</label>
                  <select 
                    value={filters.jobType}
                    onChange={e => setFilters({...filters, jobType: e.target.value})}
                    className='w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:bg-white focus:border-primary outline-none cursor-pointer transition-all'
                  >
                    <option value=''>All Types</option>
                    <option value='Full-time'>Full-time</option>
                    <option value='Part-time'>Part-time</option>
                    <option value='Contract'>Contract</option>
                    <option value='Internship'>Internship</option>
                  </select>
                </div>

                <div>
                  <label className='text-xs font-bold text-gray-700 block mb-2'>Location</label>
                  <input 
                    type='text' 
                    placeholder='e.g. Remote, Delhi' 
                    value={filters.location}
                    onChange={e => setFilters({...filters, location: e.target.value})}
                    className='w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:bg-white focus:border-primary outline-none'
                  />
                </div>

                <button 
                  onClick={() => setFilters({ jobType: '', location: '', experience: '' })}
                  className='text-xs font-bold text-primary hover:underline w-full pt-4'
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </aside>

          {/* Job List Content */}
          <main className='lg:w-3/4'>
            {loading ? (
              <div className='space-y-4'>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className='h-48 bg-white rounded-2xl border border-gray-100 animate-pulse'></div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className='space-y-4'>
                {jobs.map(job => (
                  <Link 
                    key={job._id} 
                    to={`/jobs/${job._id}`}
                    className='block bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-200 group'
                  >
                    <div className='flex items-start gap-6'>
                      <div className='w-14 h-14 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black text-xl flex-shrink-0'>
                        {job.companyName?.charAt(0)}
                      </div>
                      <div className='flex-1 space-y-2'>
                        <div className='flex justify-between items-start'>
                          <div>
                            <h3 className='text-lg font-bold text-gray-900 group-hover:text-primary transition-colors'>{job.title}</h3>
                            <p className='text-sm text-gray-500 font-medium'>{job.companyName} • {job.location}</p>
                          </div>
                          <div className='text-right'>
                            <p className='text-sm font-bold text-gray-900'>₹{(job.salary / 100000).toFixed(1)}L - ₹{(job.salary * 1.5 / 100000).toFixed(1)}L</p>
                            <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1'>Per Annum</p>
                          </div>
                        </div>
                        
                        <div className='flex flex-wrap gap-2 pt-2'>
                          <span className='badge badge-info'>{job.jobType}</span>
                          {job.skills?.slice(0, 3).map(skill => (
                            <span key={skill} className='px-2 py-1 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-bold border border-gray-100'>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className='text-center py-20 bg-white rounded-3xl border border-gray-100'>
                <div className='text-5xl mb-6'>🌑</div>
                <h3 className='text-xl font-bold text-gray-900'>No jobs found</h3>
                <p className='text-gray-500 font-medium mt-2'>Try adjusting your filters or search keywords.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;