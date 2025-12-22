import React, { useState, useEffect } from 'react';
import { AppStatus, GalleryItem } from './types';
import { SpinnerIcon, DownloadIcon, ColorPaletteIcon, PrintIcon } from './IconComponents';
import { downloadImage } from './fileUtils';

interface DisplayAreaProps {
  status: AppStatus;
  activeItem: GalleryItem | null;
  error: string | null;
  onRegenerate: () => void;
}

const loadingMessages = [
  'Consulting with the imagination experts...',
  'Drawing clean lines for little hands...',
  'Adding a sprinkle of learning magic...',
  'Preparing your custom activity sheet...',
  'Almost ready for coloring time...'
];

const DisplayArea: React.FC<DisplayAreaProps> = ({ status, activeItem, error, onRegenerate }) => {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
        const interval = setInterval(() => {
            setCurrentMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 2500);
        return () => {
          clearInterval(interval);
          setCurrentMessage(loadingMessages[0]);
        }
    }
  }, [status]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const handleDownload = () => {
    if (activeItem) {
      downloadImage(activeItem.src, `coloring-page-${activeItem.id}.png`);
    }
  };

  const handlePrint = () => {
    if (!activeItem) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Coloring Ever After - Print</title>
          <style>
            body { margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: white; }
            img { max-width: 100%; max-height: 100%; object-fit: contain; }
            @page { size: auto; margin: 10mm; }
          </style>
        </head>
        <body>
          <img src="${activeItem.src}" />
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };
  
  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center text-gray-700 min-h-[400px] w-full">
          <SpinnerIcon className="w-16 h-16 text-[#B2F7EF]" />
          <p className="mt-6 text-xl font-heading font-bold text-center text-gray-900 px-4">{currentMessage}</p>
          <p className="mt-2 text-xs text-gray-500 uppercase tracking-widest font-bold">Studio in Session</p>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className="text-center bg-red-50/50 border border-red-100 p-8 rounded-3xl w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-red-800 font-heading uppercase tracking-widest">Studio Hiccup</h3>
          <p className="text-red-600 mt-2 text-sm leading-relaxed">{error || "The studio had a slight glitch. Try a different theme!"}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-2.5 bg-red-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200"
          >
            Reset Studio
          </button>
        </div>
      );
    }

    if (status === 'success' && activeItem && activeItem.src) {
      return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
          {activeItem.educationalNote && (
              <div className="bg-[#FFDAC1]/40 border-l-4 border-[#FFDAC1] p-4 rounded-r-xl shadow-sm">
                  <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                          <svg className="h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                      </div>
                      <div className="ml-3">
                          <p className="text-sm text-gray-900 font-medium">
                              <span className="font-bold text-orange-950 uppercase text-[10px] tracking-wider block mb-0.5">Artist Tip</span>
                              {activeItem.educationalNote}
                          </p>
                      </div>
                  </div>
              </div>
          )}

          <div className="w-full flex-grow relative flex items-center justify-center min-h-0">
             <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative cursor-zoom-in"
              >
               <img
                  src={activeItem.src}
                  alt={activeItem.prompt}
                  className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-2xl border-4 border-white bg-white transition-transform group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-xl transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 px-4 py-2 rounded-full text-[10px] font-bold text-gray-800 uppercase tracking-widest shadow-lg">View Full Page ✨</span>
                </div>
             </button>
          </div>
          
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 py-2">
               <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-[#B2F7EF] hover:bg-[#98E2C6] text-teal-900 font-bold rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 uppercase tracking-wider text-xs"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-[#D4BFFF] hover:bg-[#C3A6FF] text-gray-800 font-bold rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 uppercase tracking-wider text-xs"
                >
                  <PrintIcon className="w-4 h-4" />
                  <span>Print / PDF</span>
                </button>

                 <button
                  onClick={onRegenerate}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold rounded-xl shadow-sm transition-transform transform hover:-translate-y-1 uppercase tracking-wider text-xs"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm1 14a1 1 0 011-1h5.001a5.002 5.002 0 003.9-1.834 1 1 0 011.885.666A7.002 7.002 0 015.999 15.899V18a1 1 0 01-2 0v-5a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>New Idea</span>
                </button>
            </div>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em] text-center px-4">
              Tip: Select "Print" then "Save as PDF" to color digitally!
            </p>
          </div>
        </div>
      );
    }

    return (
        <div className="text-center text-gray-600 flex flex-col items-center justify-center h-full min-h-[400px] px-6 w-full animate-in fade-in duration-700">
            <div className="bg-[#D4BFFF]/10 p-8 rounded-full mb-8 shadow-inner ring-1 ring-[#D4BFFF]/20">
                <ColorPaletteIcon className="w-16 h-16 text-[#D4BFFF]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 font-heading uppercase tracking-[0.3em]">Ready to Create</h3>
            <p className="mt-3 max-w-sm text-sm text-gray-500 font-medium leading-relaxed tracking-wide">
              Pick an age group and activity above. <br/> Leave the theme blank for a surprise!
            </p>
        </div>
    );
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 flex items-center justify-center w-full min-h-[500px] shadow-2xl border border-white/80 ring-1 ring-gray-100/50">
      {renderContent()}

      {/* Full Screen Image Modal */}
      {isModalOpen && activeItem && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[10001] p-2 hover:bg-white/10 rounded-full"
            onClick={() => setIsModalOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={e => e.stopPropagation()}>
             <div className="relative flex-grow flex items-center justify-center w-full overflow-hidden">
                <img 
                  src={activeItem.src} 
                  alt={activeItem.prompt} 
                  className="max-h-[85vh] max-w-full w-auto object-contain shadow-2xl rounded-lg bg-white p-1 sm:p-4"
                />
             </div>
             <div className="text-center text-white/90 pb-6 px-4">
                <p className="font-heading font-bold text-xl uppercase tracking-[0.3em]">{activeItem.prompt}</p>
                <div className="flex items-center justify-center gap-3 mt-2 opacity-60">
                    <span className="text-[10px] uppercase tracking-widest">{activeItem.type}</span>
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                    <span className="text-[10px] uppercase tracking-widest">Ages {activeItem.ageGroup}</span>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayArea;
