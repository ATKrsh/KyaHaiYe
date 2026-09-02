import React, { useRef, useState } from 'react';
import { TargetLanguage } from '../types/prescription';
import { Camera, ImagePlus } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (dataUrl: string) => void;
  language: TargetLanguage;
  isScanning: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  language,
  isScanning
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        onImageSelected(evt.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="uploader-simple-card">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Massive Friendly Photo Upload Button */}
      <div
        className={`drop-zone-large ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon-circle">
          <Camera size={44} className="text-accent" />
        </div>
        <div className="upload-text-content">
          <h2 className="upload-headline">
            {language === 'hi'
              ? '📸 1. डॉक्टर के पर्चे (लिखावट) की फोटो चुनें'
              : '📸 1. Select Prescription Photo'}
          </h2>
          <p className="upload-subline">
            {language === 'hi'
              ? 'यहाँ क्लिक करें या फोटो खींचकर लाएं (घसीट लिखावट पढ़ें)'
              : 'Click here or drag photo to read handwritten doctor notes'}
          </p>
        </div>
        <button type="button" className="btn-big-upload" disabled={isScanning}>
          <ImagePlus size={20} />
          <span>{language === 'hi' ? 'फोटो चुनें (Choose Photo)' : 'Choose Photo'}</span>
        </button>
      </div>
    </div>
  );
};
