
import React from 'react';

export const SpinnerIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const PrintIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.89l-4.47 4.47a.75.75 0 101.06 1.06l4.47-4.47H10.5a2.25 2.25 0 012.25 2.25v.75a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75a2.25 2.25 0 012.25-2.25h.75m0-3V3a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0115.75 3v10.89m0 0l4.47 4.47a.75.75 0 11-1.06 1.06l-4.47-4.47h-3.75a2.25 2.25 0 01-2.25-2.25v-.75a2.25 2.25 0 012.25-2.25h7.5a2.25 2.25 0 012.25 2.25v.75a2.25 2.25 0 01-2.25 2.25h-.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h7.5M6.75 9.75h7.5" />
  </svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V8.25c0-1.12 0.87-2.062 1.946-2.151a12.258 12.258 0 0114.108 0c1.076.089 1.946 1.031 1.946 2.151v9c0 1.12-.87 2.062-1.946 2.151a12.258 12.258 0 01-14.108 0A2.151 2.151 0 013 17.25z" />
    </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

export const ColorPaletteIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.484-1.007 4.73-2.636 6.364" />
        <path d="M16 9.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S14.448 8 15 8s1 .672 1 1.5z" />
        <path d="M12 12.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S10.448 11 11 11s1 .672 1 1.5z" />
        <path d="M8 9.5c0 .828-.448 1.5-1 1.5S6 10.328 6 9.5 6.448 8 7 8s1 .672 1 1.5z" />
        <path d="M12 22a7.5 7.5 0 007.5-7.5c0-2.042-.82-3.882-2.146-5.208" />
    </svg>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 14.242A2.25 2.25 0 1 0 12 16.5m0-9a2.25 2.25 0 1 0-4.783 2.258m4.783-2.258a2.25 2.25 0 1 1-4.783 2.258m4.783 2.258 4.783-2.258M12 14.242 7.217 16.5" />
    </svg>
);

export const LockIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);
