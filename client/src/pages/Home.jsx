import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='bg-white min-h-screen'>
      {/* Hero Section */}
      <section className='relative pt-24 pb-32 border-b border-gray-100 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='flex flex-col lg:flex-row items-center gap-16'>
            <div className='lg:w-1/2 space-y-10'>
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full'>
                <span className='w-2 h-2 bg-primary rounded-full animate-pulse'></span>
                <span className='text-xs font-bold text-primary uppercase tracking-widest'>India's Premier Job Network</span>
              </div>

              <h1 className='text-[56px] leading-[1.1] font-bold text-gray-900 tracking-tight'>
                Find work that <br />
                <span className='text-primary glow-text'>defines you.</span>
              </h1>

              <p className='text-lg text-gray-500 max-w-lg leading-relaxed font-medium'>
                Join 25,000+ professionals discovering opportunities from India's most innovative companies. Your next career milestone starts here.
              </p>

              <div className='flex items-center gap-4 pt-4'>
                <Link to='/jobs' className='bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center gap-2'>
                  Explore Jobs <span>→</span>
                </Link>
                <Link to='/register' className='text-gray-900 border border-gray-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all'>
                  Post a Job
                </Link>
              </div>
            </div>

            {/* Visual Side: Floating Job Card Mockup */}
            <div className='lg:w-1/2 relative hidden lg:block'>
              <div className='absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]'></div>
              <div className='relative bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl animate-float max-w-[400px] ml-auto'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white font-bold text-xl'>R</div>
                  <div>
                    <h3 className='font-bold text-gray-900'>Product Designer</h3>
                    <p className='text-xs text-gray-500 font-medium'>Razorpay • Bangalore</p>
                  </div>
                </div>
                <div className='space-y-3 mb-8'>
                  <div className='h-2 bg-gray-50 rounded-full w-full'></div>
                  <div className='h-2 bg-gray-50 rounded-full w-[80%]'></div>
                  <div className='h-2 bg-gray-50 rounded-full w-[90%]'></div>
                </div>
                <div className='flex gap-2 mb-8'>
                  <span className='px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-400'>UX DESIGN</span>
                  <span className='px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-400'>FIGMA</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-sm font-bold text-gray-900'>₹18L - ₹24L</div>
                  <button className='px-4 py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold'>Apply Now</button>
                </div>
              </div>

              {/* Secondary floating element */}
              <div className='absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl border border-gray-100 shadow-xl animate-float-delayed flex items-center gap-4'>
                <div className='w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600'>✓</div>
                <div>
                  <p className='text-xs font-bold text-gray-900'>Application Sent!</p>
                  <p className='text-[10px] text-gray-400 font-medium'>Success rate increased by 40%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle grid pattern background */}
        <div className='absolute inset-0 bg-grid-pattern opacity-[0.4] -z-10'></div>
      </section>

      {/* Marquee Section */}
      <section className='py-12 border-b border-gray-100 bg-gray-50/50'>
        <div className='max-w-7xl mx-auto px-4 overflow-hidden'>
          <p className='text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8'>Trusted by industry leaders</p>
          <div className='flex items-center justify-between gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500'>
            {['Zomato', 'Paytm', 'Swiggy', 'Razorpay', 'CRED', 'Flipkart'].map(brand => (
              <span key={brand} className='text-2xl font-black italic tracking-tighter text-gray-900'>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section in Dark Strip */}
      <section className='bg-gray-900 py-16 text-white'>
        <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12'>
          {[
            { value: '10,000+', label: 'Active Job Openings' },
            { value: '500+', label: 'Verified Employers' },
            { value: '25,000+', label: 'Success Story Stories' }
          ].map((stat, i) => (
            <div key={i} className='text-center space-y-2'>
              <div className='text-4xl font-bold text-primary'>{stat.value}</div>
              <div className='text-sm font-medium text-gray-400 uppercase tracking-widest'>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className='py-32 max-w-7xl mx-auto px-4'>
        <div className='mb-20'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>Built for the <span className='text-accent'>modern workforce.</span></h2>
          <p className='text-lg text-gray-500 max-w-2xl font-medium'>We've reimagined the job search experience from the ground up, focusing on speed, transparency, and quality.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          {[
            {
              title: "Quality First",
              desc: "No more spam. We manually verify every job and company to ensure a high-quality experience.",
              icon: "✨"
            },
            {
              title: "Instant Feedback",
              desc: "Know exactly where you stand. Real-time status updates from recruiters at every stage.",
              icon: "⚡"
            },
            {
              title: "AI Power-ups",
              desc: "Automated resume parsing and smart matching that connects you with the right roles instantly.",
              icon: "🤖"
            }
          ].map((feature, i) => (
            <div key={i} className='group p-8 rounded-3xl border border-gray-100 hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all duration-300'>
              <div className='w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform'>{feature.icon}</div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>{feature.title}</h3>
              <p className='text-gray-500 leading-relaxed font-medium'>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className='py-24 bg-gray-50 border-t border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 text-center space-y-8'>
          <h2 className='text-3xl font-bold text-gray-900'>Ready to build your career?</h2>
          <div className='flex items-center justify-center gap-4'>
            <Link to='/register' className='btn-primary px-10'>Join Rozgaar</Link>
          </div>
          <p className='text-sm text-gray-400 font-medium'>© 2026 Rozgaar. All rights reserved.</p>
        </div>
      </footer>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default Home;