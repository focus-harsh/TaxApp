import Link from 'next/link';
import Image from 'next/image';
import FAQAccordion from '@/components/wizard/FAQAccordion';

export default function Home() {
  return (
    <div className="flex-grow flex flex-col bg-slate-50 font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative px-6 py-16 md:py-24 max-w-screen-xl mx-auto w-full overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-60 -z-10 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-50 rounded-full blur-[80px] opacity-60 -z-10 -translate-x-1/3 translate-y-1/3"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100/50 border border-green-200 text-green-800 text-[10px] font-bold uppercase tracking-wider">
              FY 2025-26 (AY 2026-27) UPDATED
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Find the tax regime that saves you <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">more money</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg">
              Answer 8 simple questions and get your personalized tax recommendation in 2 minutes.
            </p>

            {/* Inline Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> 100% Free</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> No Signup</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Instant Results</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Zero Data Collection</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
              <Link 
                href="/wizard" 
                className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Start Free Calculation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=11" alt="user" className="w-full h-full object-cover" /></div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=12" alt="user" className="w-full h-full object-cover" /></div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=13" alt="user" className="w-full h-full object-cover" /></div>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Trusted by <span className="font-bold text-slate-900">1,00,000+</span> taxpayers
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Tax Preview Card */}
          <div className="relative z-10 w-full max-w-md mx-auto lg:ml-auto">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <h3 className="font-bold text-slate-900 mb-6">Your Tax Savings Preview</h3>
              
              <div className="bg-[#ECFDF5] rounded-2xl p-5 border border-green-100 flex justify-between items-center mb-6">
                <div>
                  <p className="text-[11px] font-semibold text-green-700 mb-1">You can save up to</p>
                  <p className="text-3xl font-extrabold text-green-600 tracking-tight">₹78,540</p>
                  <p className="text-[10px] text-green-800 mt-1">by choosing the New Tax Regime</p>
                </div>
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-green-50">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-400 z-10 border-2 border-white">VS</div>
                <div className="text-center p-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Old Tax Regime</p>
                  <p className="text-lg font-bold text-slate-900">₹12,45,780</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">Total Tax Liability</p>
                </div>
                <div className="text-center p-3 bg-green-50/50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">New Tax Regime</p>
                  <p className="text-lg font-bold text-green-600">₹11,67,240</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">Total Tax Liability</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex justify-between items-center">
                <p className="text-xs font-bold text-blue-800">Potential Savings</p>
                <p className="text-lg font-bold text-blue-700">₹78,540</p>
              </div>

              <div className="mt-5 flex gap-2 items-start">
                <span className="text-yellow-500 text-xs">💡</span>
                <p className="text-[10px] text-slate-400 leading-relaxed">This is just a preview. Get your detailed breakdown after answering a few simple questions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Media Logos */}
      <section className="border-y border-slate-200/60 bg-white py-10">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest md:mr-4">As seen on</p>
            <div className="font-serif font-bold text-xl text-slate-800">THE ECONOMIC TIMES</div>
            <div className="font-sans font-black text-2xl text-[#F47920]">mint</div>
            <div className="font-sans font-bold text-xl text-[#003366] flex items-center gap-1"><span className="text-xl">❖</span> FINANCIAL EXPRESS</div>
            <div className="font-serif font-bold text-xl text-slate-800 italic">The Indian EXPRESS</div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why choose <span className="text-blue-600">Your Tax Calculator?</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'green', title: 'Personalized for You', desc: 'Our smart algorithm analyzes your income, investments & deductions to find your best tax regime.' },
              { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'blue', title: 'Maximize Your Savings', desc: 'We compare both old and new tax regimes to show you the option that puts more money in your pocket.' },
              { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', color: 'purple', title: '100% Secure & Private', desc: 'Your data stays private. We don\'t store or share any of your personal information.' },
              { icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', color: 'orange', title: 'Expert Backed', desc: 'Our calculations are based on the latest tax laws & rules for FY 2025-26 (AY 2026-27).' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  feature.color === 'green' ? 'bg-green-50 text-green-500' :
                  feature.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                  feature.color === 'purple' ? 'bg-purple-50 text-purple-500' :
                  'bg-orange-50 text-orange-500'
                }`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} /></svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats & Social Proof */}
      <section className="py-16 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="w-full lg:w-1/3 bg-green-50 border border-green-100 rounded-3xl p-8">
            <div className="text-green-500 text-4xl font-serif leading-none mb-4">"</div>
            <p className="text-slate-700 font-medium leading-relaxed mb-8">
              Your Tax Calculator helped me save over ₹1.2 lakh by choosing the right tax regime. Super easy and reliable!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden"><img src="https://i.pravatar.cc/100?img=11" alt="Rahul" className="w-full h-full object-cover" /></div>
              <div>
                <p className="text-sm font-bold text-slate-900">Rahul Sharma</p>
                <p className="text-xs text-slate-500">Salaried Employee</p>
              </div>
            </div>
            <div className="flex justify-center gap-1.5 mt-6">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="w-2 h-2 rounded-full bg-slate-200"></div>
              <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <h3 className="text-xl font-bold text-slate-900 mb-10 text-center lg:text-left">Trusted by thousands of smart taxpayers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Calculations Done', value: '1,00,000+', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'text-green-500 bg-green-50' },
                { label: 'Total Tax Savings', value: '₹250 Cr+', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-blue-500 bg-blue-50' },
                { label: 'User Rating', value: '4.9/5', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: 'text-purple-500 bg-purple-50' },
                { label: 'Free to Use', value: '100%', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-blue-500 bg-blue-50' },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${stat.color}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} /></svg>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="py-24 bg-white px-6 border-t border-slate-100">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 relative">
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px border-t-2 border-dashed border-slate-200 z-0"></div>
            
            {[
              { step: '1', title: 'Answer 8 Simple Questions', desc: 'Tell us about your income, investments & expenses.' },
              { step: '2', title: 'We Do the Math', desc: 'Our smart calculator analyzes both tax regimes for you.' },
              { step: '3', title: 'Get Your Results', desc: 'See your tax liability comparison and potential savings.' },
              { step: '4', title: 'Choose & Save', desc: 'Pick the regime that saves you more and file with confidence.' }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/4 px-4">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 text-green-600 flex items-center justify-center text-lg font-bold mb-6 shadow-sm mx-auto lg:mx-0">
                  {item.step}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 5. FAQ Section */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-slate-900">Common Doubts, Answered</h2>
            <p className="text-slate-500 mt-3 text-base">Have questions before you start? We've got you covered.</p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* 6. Final CTA Banner */}
      <section className="py-16 px-6 mb-12">
        <div className="max-w-screen-xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-100 rounded-full blur-[80px] opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-100 rounded-full blur-[80px] opacity-50 -z-10 -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Stop guessing. Start saving.</h2>
            <p className="text-sm md:text-base text-slate-600 mb-8">Find out which tax regime is better for you in just 2 minutes.</p>
            
            <Link 
              href="/wizard" 
              className="inline-flex rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] hover:bg-blue-700 hover:-translate-y-0.5 transition-all items-center justify-center gap-2 mb-6"
            >
              Start Your Free Calculation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold text-slate-500">
              <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> No Signup</span>
              <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> No Charges</span>
              <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Instant Results</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
