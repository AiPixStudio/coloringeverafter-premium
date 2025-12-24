
import React from 'react';
import { CreditPackage } from '../types';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number) => void;
}

const PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 50,
    price: '$4.99',
    color: 'bg-[#B2F7EF]',
  },
  {
    id: 'value',
    name: 'Creator Bundle',
    credits: 150,
    price: '$9.99',
    popular: true,
    color: 'bg-[#FFDAC1]',
  },
  {
    id: 'pro',
    name: 'Studio Pro',
    credits: 500,
    price: '$19.99',
    color: 'bg-[#D4BFFF]',
  }
];

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, onPurchase }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-white p-6 sm:p-10 animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl text-gray-800 uppercase tracking-widest mb-3">
            Top Up Your Studio
          </h2>
          <p className="text-gray-500 font-medium">
            Get more credits to create beautiful coloring pages. <br/>
            <span className="text-[10px] uppercase tracking-widest font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md mt-2 inline-block">1 Generation = 10 Credits</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`relative rounded-3xl p-6 border-2 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                pkg.popular 
                ? 'border-[#FFDAC1] bg-gradient-to-b from-[#FFF5EB] to-white scale-105 shadow-lg' 
                : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 bg-[#FFDAC1] text-orange-900 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  Most Popular
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl ${pkg.color} flex items-center justify-center mb-6 shadow-inner`}>
                 <span className="text-2xl">✨</span>
              </div>

              <h3 className="font-bold text-gray-900 text-lg uppercase tracking-wider mb-1">{pkg.name}</h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
                {pkg.credits} Credits
              </p>

              <div className="mt-auto w-full">
                <p className="text-3xl font-heading font-bold text-gray-800 mb-6">{pkg.price}</p>
                <button 
                  onClick={() => onPurchase(pkg.credits)}
                  className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors ${
                    pkg.popular 
                    ? 'bg-[#FFDAC1] hover:bg-[#ffcba6] text-orange-900 shadow-lg shadow-orange-100' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Secure payments processed by magic (Demo Mode)
            </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
