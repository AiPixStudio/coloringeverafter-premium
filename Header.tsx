
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative w-full pt-2 pb-1 overflow-hidden">
      <div className="container mx-auto px-4 text-center mt-1">
        {/* Responsive font sizing using clamp and vw units to ensure it never breaks on small hardware */}
        <h1 className="font-signature text-[13vw] sm:text-7xl md:text-8xl lg:text-9xl text-[#FFC107] whitespace-nowrap drop-shadow-sm select-none leading-none">
          Coloring Ever After
        </h1>
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <h2 className="font-heading text-sm sm:text-base md:text-lg text-[#D4BFFF] font-bold tracking-[0.4em] uppercase">
            Creators Suite
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-[#B2F7EF]" />
            <p className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.3em]">
              Boutique AI Activity Studio
            </p>
            <div className="h-[1px] w-6 bg-[#B2F7EF]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
