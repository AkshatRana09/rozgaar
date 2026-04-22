import { useState, useEffect } from 'react';
import axios from '../lib/axios';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const SeekerDashboard = () => {
  const { user } = useAuthStore();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const { data } = await axios.get('/applications/my');
        setApplications(data.applications || []);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const stats = [
    { label: 'Total Applied', value: applications.length, icon: '📄', color: 'bg-primary/10 text-primary border-primary/20' },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'shortlisted').length, icon: '✨', color: 'bg-success/10 text-success border-success/20' },
    { label: 'Reviewing', value: applications.filter(a => a.status === 'reviewing').length, icon: '🔍', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { label: 'Rejected', value: applications.filter(a => a.status === 'rejected').length, icon: '🌑', color: 'bg-danger/10 text-danger border-danger/20' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className='badge badge-warning'>Pending</span>;
      case 'reviewing': return <span className='badge badge-info'>Reviewing</span>;
      case 'shortlisted': return <span className='badge badge-success'>Shortlisted</span>;
      case 'rejected': return <span className='badge badge-danger'>Rejected</span>;
      case 'hired': return <span className='badge bg-purple-100 text-purple-600 border-purple-200'>Hired</span>;
      default: return <span className='badge'>{status}</span>;
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
        <div className='mb-12'>
          <h1 className='text-3xl font-bold text-gray-900'>My Activity Dashboard</h1>
          <p className='text-gray-500 font-medium mt-1'>Track your applications and hiring status in real-time.</p>
        </div>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          {stats.map(stat => (
            <div key={stat.label} className={`p-6 rounded-3xl border ${stat.color} flex items-center justify-between shadow-sm`}>
              <div className='space-y-1'>
                <p className='text-[10px] font-black uppercase tracking-widest opacity-70'>{stat.label}</p>
                <p className='text-3xl font-black'>{stat.value}</p>
              </div>
              <div className='text-3xl opacity-30'>{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Applications Table */}
        <div className='bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden'>
          <div className='p-8 border-b border-gray-50 flex items-center justify-between'>
            <h2 className='text-lg font-bold text-gray-900'>Recent Applications</h2>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-success rounded-full animate-pulse'></div>
              <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>Live Tracker</span>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className='bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>
                  <th className='px-8 py-5'>Job Role</th>
                  <th className='px-8 py-5'>Company</th>
                  <th className='px-8 py-5'>Applied Date</th>
                  <th className='px-8 py-5'>Status</th>
                  <th className='px-8 py-5 text-right'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {applications.map(app => (
                  <tr key={app._id} className='hover:bg-gray-50/30 transition-colors group'>
                    <td className='px-8 py-6'>
                      <p className='font-bold text-gray-900 group-hover:text-primary transition-colors'>{app.job?.title}</p>
                      <p className='text-[10px] text-gray-400 font-bold uppercase tracking-tight'>{app.job?.jobType}</p>
                    </td>
                    <td className='px-8 py-6 font-bold text-gray-500'>{app.job?.company}</td>                    <td className='px-8 py-6 font-medium text-gray-400 text-sm'>
                      {new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className='px-8 py-6'>
                      {getStatusBadge(app.status)}
                    </td>
                    <td className='px-8 py-6 text-right'>
                      <button
                        onClick={async () => {
                          try {
                            await axios.delete(`/applications/${app._id}`);
                            toast.success('Application withdrawn');
                            setApplications(applications.filter(a => a._id !== app._id));
                          } catch (error) {
                            toast.error(error.response?.data?.message || 'Failed to withdraw');
                          }
                        }}
                        className='text-xs font-black text-red-500 hover:underline opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest'
                      >
                        Withdraw
                      </button>
                    </td>
                  </tr>
                ))}

                {applications.length === 0 && (
                  <tr>
                    <td colSpan='5' className='px-8 py-20 text-center'>
                      <p className='text-gray-400 font-bold'>You haven't applied to any jobs yet.</p>
                      <button className='text-primary font-bold mt-2 hover:underline'>Browse jobs now →</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;