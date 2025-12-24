import React, { useState, useRef } from 'react';
import { fileToBase64 } from '../utils/fileUtils';
import { UploadIcon, TrashIcon } from './IconComponents';
interface ImageUploaderProps {
  onImageUpload: (base64: string | null) => void;
  disabled: boolean;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, disabled }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setPreview(base64);
        onImageUpload(base64);
      } catch (error) {
        console.error("Error converting file to base64", error);
        onImageUpload(null);
      }
    }
  };
  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        Upload a Reference Photo (Optional)
      </label>
      <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-center p-2 relative">
        {!preview && (
          <div className="text-gray-500">
             <UploadIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Drop an image or <button type="button" onClick={() => fileInputRef.current?.click()} className="font-semibold text-blue-600 hover:underline">click to upload</button></p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              disabled={disabled}
            />
          </div>
        )}
        {preview && (
            <>
                <img src={preview} alt="Reference preview" className="h-full w-full object-contain rounded-md" />
                <button 
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 text-red-600 rounded-full shadow-md hover:bg-red-100"
                    aria-label="Remove image"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </>
        )}
      </div>
    </div>
  );
};
export default ImageUploader;
