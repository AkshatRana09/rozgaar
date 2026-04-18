import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out');
    navigate('/login');
  };

  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between'>
        <div className='flex items-center gap-10'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-2 group'>
            <span className='text-xl font-bold tracking-tight text-gray-900 group-hover:text-primary transition-colors'>
              Rozgaar <span className='text-lg'>💼</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className='hidden md:flex items-center gap-8'>
            <Link to='/jobs' className='text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors'>
              Find Jobs
            </Link>
            <Link to='/register' className='text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors'>
              For Recruiters
            </Link>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          {user ? (
            <div className='relative'>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className='w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-all active:scale-95'
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>
              
              {showDropdown && (
                <>
                  <div className='fixed inset-0' onClick={() => setShowDropdown(false)}></div>
                  <div className='absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 animate-in fade-in slide-in-from-top-2 duration-200'>
                    <div className='px-4 py-3 border-b border-gray-50 mb-1'>
                      <p className='text-sm font-bold text-gray-900 truncate'>{user.name}</p>
                      <p className='text-xs text-gray-500 truncate'>{user.email}</p>
                    </div>
                    <Link 
                      to={user.role === 'seeker' ? '/dashboard/seeker' : '/dashboard/recruiter'} 
                      className='block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium'
                      onClick={() => setShowDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/5 rounded-lg transition-colors font-medium'
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Link to='/login' className='text-sm font-semibold text-gray-500 hover:text-gray-900 px-4 py-2 transition-colors'>
                Login
              </Link>
              <Link to='/register' className='bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-all shadow-sm active:scale-95'>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;