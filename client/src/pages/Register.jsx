import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'seeker' });
  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) {
      toast.success('Welcome to Rozgaar! 🎉');
      navigate('/jobs');
    } else {
      toast.error(result.message || 'Check your details');
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Panel: Dark Brand Identity */}
      <div className='hidden lg:flex w-1/2 bg-gray-900 p-16 flex-col justify-between relative overflow-hidden'>
        <div className='relative z-10'>
          <Link to='/' className='text-white text-2xl font-bold tracking-tight mb-20 block'>
            Rozgaar 💼
          </Link>
          <div className='space-y-8 mt-20'>
            <h2 className='text-5xl font-bold text-white leading-tight'>
              Join India's most <br />
              trusted <span className='text-accent'>job portal.</span>
            </h2>
            <div className='space-y-6'>
              {[
                "Access to 10k+ verified listings",
                "Advanced AI resume matching",
                "Direct connection with founders",
                "Completely free for job seekers"
              ].map(item => (
                <div key={item} className='flex items-center gap-3 text-gray-400 font-medium'>
                  <span className='w-5 h-5 bg-accent/20 text-accent rounded-full flex items-center justify-center text-[10px] font-black'>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className='relative z-10 border-t border-gray-800 pt-8'>
          <p className='text-gray-500 font-medium italic'>"Built by developers, for developers. The UI is cleaner than any platform I've used."</p>
          <p className='text-white font-bold mt-2'>— Amita S., Product Manager</p>
        </div>

        <div className='absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] -ml-96 -mb-96'></div>
        <div className='absolute inset-0 bg-grid-pattern opacity-[0.05]'></div>
      </div>

      {/* Right Panel: Register Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto py-20'>
        <div className='w-full max-w-md space-y-10'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-gray-900'>Get Started 🚀</h1>
            <p className='text-gray-500 font-medium'>Create your free account and start your journey.</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-1'>
              <label className='text-sm font-bold text-gray-700 ml-1'>Full Name</label>
              <input 
                type='text' placeholder='Rahul Sharma' 
                className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-medium text-gray-900'
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className='space-y-1'>
              <label className='text-sm font-bold text-gray-700 ml-1'>Email Address</label>
              <input 
                type='email' placeholder='rahul@example.com' 
                className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-medium text-gray-900'
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className='space-y-1'>
              <label className='text-sm font-bold text-gray-700 ml-1'>Password</label>
              <input 
                type='password' placeholder='••••••••' 
                className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-medium text-gray-900'
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <div className='space-y-1'>
              <label className='text-sm font-bold text-gray-700 ml-1'>I am a</label>
              <div className='grid grid-cols-2 gap-3'>
                {[
                  { id: 'seeker', label: 'Job Seeker' },
                  { id: 'recruiter', label: 'Recruiter' }
                ].map(role => (
                  <button
                    key={role.id}
                    type='button'
                    onClick={() => setFormData({...formData, role: role.id})}
                    className={`py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                      formData.role === role.id 
                      ? 'bg-primary/5 border-primary text-primary' 
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type='submit' 
              disabled={loading}
              className='w-full py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2'
            >
              {loading ? (
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
              ) : 'Create Account'}
            </button>
          </form>

          <div className='text-center space-y-4'>
            <p className='text-sm text-gray-500 font-medium'>
              Already have an account?{' '}
              <Link to='/login' className='text-primary font-bold hover:underline'>Sign in</Link>
            </p>
            <div className='flex items-center gap-4 py-2'>
              <div className='h-[1px] bg-gray-100 flex-1'></div>
              <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>India's Choice</span>
              <div className='h-[1px] bg-gray-100 flex-1'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;