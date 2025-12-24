import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ControlsPanel from './components/ControlsPanel';
import DisplayArea from './components/DisplayArea';
import Gallery from './components/Gallery';
import Settings from './Settings';
import { generateContent } from './services/geminiService';
import { AppStatus, GalleryItem, AgeGroup, ActivityType, Holiday } from './types';
import { getUserApiKey } from './Settings';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const savedItems = localStorage.getItem('cea_gallery_items');
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    const apiKey = getUserApiKey();
    setHasApiKey(!!apiKey);
    
    if (!apiKey) {
      setShowSettings(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cea_gallery_items', JSON.stringify(galleryItems));
  }, [galleryItems]);

  const handleSettingsClose = () => {
    const apiKey = getUserApiKey();
    setHasApiKey(!!apiKey);
    
    if (apiKey) {
      setShowSettings(false);
    }
  };

  const handleGenerate = async (
    prompt: string,
    ageGroup: AgeGroup,
    activityType: ActivityType,
    holiday: Holiday
  ) => {
    setStatus('loading');
    setError(null);
    setActiveItem(null);

    try {
      const { imageUrl, educationalNote } = await generateContent({ 
        prompt, 
        ageGroup, 
        activityType, 
        holiday 
      });

      const newItem: GalleryItem = {
        id: new Date().getTime().toString(),
        src: imageUrl,
        prompt: prompt || `${activityType} Theme`,
        type: activityType,
        ageGroup: ageGroup,
        holiday: holiday,
        educationalNote: educationalNote,
      };
      
      setGalleryItems(prev => [newItem, ...prev]);
      setActiveItem(newItem);
      setStatus('success');
      
    } catch (e: any) {
      const errorMessage = e.message || 'Magic failed to happen.';
      setError(errorMessage);
      setStatus('error');
    }
  };
  
  const handleRegenerate = () => {
    if (activeItem) {
      handleGenerate(activeItem.prompt, activeItem.ageGroup, activeItem.type, activeItem.holiday || 'None');
    }
  };

  const handleSelectItem = (item: GalleryItem) => {
    setActiveItem(item);
    setStatus('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDeleteItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
    if (activeItem?.id === id) {
        setActiveItem(null);
        setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      {hasApiKey && (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-4 max-w-4xl">
          <div className="flex justify-end">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 font-bold rounded-xl shadow-md hover:shadow-lg transition-all uppercase tracking-wider text-xs border-2 border-purple-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span>API Settings</span>
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col items-center gap-8 max-w-4xl">
        <div className="w-full">
          <ControlsPanel onGenerate={handleGenerate} isLoading={status === 'loading'} />
        </div>

        <div className="w-full space-y-12">
          <DisplayArea 
            status={status} 
            activeItem={activeItem} 
            error={error} 
            onRegenerate={handleRegenerate} 
          />
          <Gallery items={galleryItems} onSelectItem={handleSelectItem} onDeleteItem={handleDeleteItem} activeItemId={activeItem?.id} />
        </div>
      </main>

      {showSettings && <Settings onClose={handleSettingsClose} />}
    </div>
  );
};

export default App;
