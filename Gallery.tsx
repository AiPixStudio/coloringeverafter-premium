import React from 'react';
import { GalleryItem } from './types';
import { DownloadIcon, TrashIcon } from './IconComponents';
import { downloadImage } from './fileUtils';
interface GalleryProps {
  items: GalleryItem[];
  onSelectItem: (item: GalleryItem) => void;
  onDeleteItem: (id: string) => void;
  activeItemId?: string;
}
const Gallery: React.FC<GalleryProps> = ({ items, onSelectItem, onDeleteItem, activeItemId }) => {
  if (items.length === 0) {
    return null;
  }
  
  const handleDownload = (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation();
    downloadImage(item.src, `coloring-page-${item.id}.png`);
  }
  
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteItem(id);
  }
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 px-2 text-center sm:text-left uppercase tracking-widest">My Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className={`relative group aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-xl bg-white ${
                activeItemId === item.id 
                ? 'ring-4 ring-[#D4BFFF] ring-offset-2' 
                : 'hover:ring-4 hover:ring-[#D4BFFF]/30 hover:ring-offset-2'
            }`}
          >
            <img src={item.src} alt={item.prompt} className="w-full h-full object-cover p-2" />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-white text-center backdrop-blur-[2px]">
              <p className="text-[10px] font-bold leading-tight uppercase tracking-wider line-clamp-3" title={item.prompt}>
                  {item.prompt}
              </p>
            </div>
            {/* Actions */}
             <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                <button
                  onClick={(e) => handleDownload(e, item)}
                  className="bg-[#B2F7EF] hover:bg-white text-teal-900 p-2 rounded-full shadow-lg transition-colors"
                  aria-label="Download image"
                >
                  <DownloadIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-white hover:bg-red-50 text-red-400 hover:text-red-600 p-2 rounded-full shadow-lg transition-colors"
                  aria-label="Delete image"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Gallery;
