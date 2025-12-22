import React, { useState, useEffect } from 'react';
import Header from './Header';
import ControlsPanel from './ControlsPanel';
import DisplayArea from './DisplayArea';
import Gallery from './Gallery';
import AccessGate from './AccessGate';
import { generateContent } from './geminiService';
import { AppStatus, GalleryItem, AgeGroup, ActivityType, Holiday } from './types';
const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const savedItems = localStorage.getItem('cea_gallery_items');
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (e) {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem('cea_gallery_items', JSON.stringify(galleryItems));
  }, [galleryItems]);
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
    <AccessGate>
      <div className="min-h-screen pb-20">
        <Header />
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
      </div>
    </AccessGate>
  );
};
export default App;
