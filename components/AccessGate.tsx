
import React, { useState, useEffect } from 'react';
import { LockIcon } from './IconComponents';

interface AccessGateProps {
  children: React.ReactNode;
}

const ACCESS_CODE = "magic"; 

const AccessGate: React.FC<AccessGateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('cea_access_granted');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.toLowerCase().trim() === ACCESS_CODE) {
      setIsAuthenticated(true);
      localStorage.setItem('cea_access_granted', 'true');
      setError(false);
    } else {
      setError(true);
      setInputCode('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 z-[9999]">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10" />
      
      <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl max-w-lg w-full text-center border-[6px] border-white relative overflow-hidden ring-1 ring-gray-100">
        {/* Whimsical Decorative Circles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-mint/30 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-peach/30 rounded-full blur-2xl" />

        <div className="relative z-10">
          {/* Main Title: Sized for one-line fitting */}
          <h1 className="font-signature text-4xl sm:text-5xl md:text-6xl text-[#FFC107] mb-1 drop-shadow-sm leading-tight select-none whitespace-nowrap">
            Coloring Ever After
          </h1>
          
          {/* Subtitle: Welcome in new Pastel Studio Purple */}
          <h2 className="text-[#D4BFFF] mb-10 font-heading uppercase tracking-[0.4em] text-lg md:text-xl font-bold">
            Welcome
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                Enter Studio Secret Code
              </label>
              <input 
                type="password" 
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="••••••"
                className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-mint/50 focus:border-mint outline-none text-center text-3xl tracking-[0.4em] transition-all font-sans"
                autoFocus
              />
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-500 text-[9px] font-bold py-2 px-4 rounded-full animate-pulse border border-red-100 uppercase tracking-wider">
                Invalid secret. Try "magic"
              </div>
            )}

            <button 
              type="submit" 
              className="w-full px-8 py-5 bg-[#D4BFFF] hover:bg-[#C3A6FF] text-gray-800 font-bold rounded-[2rem] shadow-xl shadow-[#D4BFFF]/30 transform hover:-translate-y-1 active:scale-95 uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-3 transition-all"
            >
              <LockIcon className="w-4 h-4" />
              Unlock Studio
            </button>
          </form>
          
          <div className="mt-12 pt-6 border-t border-gray-50">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em]">
              Premium Creator Edition 2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessGate;