import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      toast.success('Welcome back!');
      navigate('/jobs');
    } else {
      toast.error(result.message || 'Check your credentials');
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
              Your career is <br />
              our <span className='text-primary'>mission.</span>
            </h2>
            <div className='space-y-6'>
              {[
                "AI-driven job matching",
                "Direct contact with recruiters",
                "Real-time application tracking",
                "Verified company profiles"
              ].map(item => (
                <div key={item} className='flex items-center gap-3 text-gray-400 font-medium'>
                  <span className='w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-[10px] font-black'>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className='relative z-10 border-t border-gray-800 pt-8'>
          <p className='text-gray-500 font-medium italic'>"The best platform for high-growth tech opportunities in India."</p>
          <p className='text-white font-bold mt-2'>— Rahul V., Senior Dev at CRED</p>
        </div>

        {/* Abstract Background Design */}
        <div className='absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -mr-96 -mt-96'></div>
        <div className='absolute inset-0 bg-grid-pattern opacity-[0.05]'></div>
      </div>

      {/* Right Panel: Login Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-white'>
        <div className='w-full max-w-md space-y-10'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-gray-900'>Welcome Back</h1>
            <p className='text-gray-500 font-medium'>Sign in to your Rozgaar account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-1'>
              <label className='text-sm font-bold text-gray-700 ml-1'>Email Address</label>
              <input 
                type='email' 
                placeholder='rahul@example.com' 
                className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-medium text-gray-900'
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className='space-y-1'>
              <div className='flex justify-between items-center ml-1'>
                <label className='text-sm font-bold text-gray-700'>Password</label>
                <button type='button' className='text-xs font-bold text-primary hover:underline'>Forgot Password?</button>
              </div>
              <div className='relative'>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder='••••••••' 
                  className='w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-medium text-gray-900'
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button 
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest'
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button 
              type='submit' 
              disabled={loading}
              className='w-full py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2'
            >
              {loading ? (
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
              ) : 'Sign In'}
            </button>
          </form>

          <div className='text-center space-y-4'>
            <p className='text-sm text-gray-500 font-medium'>
              Don't have an account?{' '}
              <Link to='/register' className='text-primary font-bold hover:underline'>Create account</Link>
            </p>
            <div className='flex items-center gap-4 py-2'>
              <div className='h-[1px] bg-gray-100 flex-1'></div>
              <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>Secure Login</span>
              <div className='h-[1px] bg-gray-100 flex-1'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;