import React, { useRef } from 'react';
import { Camera, UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const PhotoUploader = ({ photos = [], onPhotosChange, maxPhotos = 4 }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  const sampleDamagedPhotos = [
    { label: 'Leaking Pipe', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80' },
    { label: 'Sparking Switch', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80' },
    { label: 'Broken Drain', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&auto=format&fit=crop&q=80' },
  ];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      if (photos.length >= maxPhotos) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onPhotosChange([...photos, event.target.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddSample = (url) => {
    if (photos.length < maxPhotos && !photos.includes(url)) {
      onPhotosChange([...photos, url]);
    }
  };

  const handleRemove = (index) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            {t('uploadPhotoPrompt')}
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t('uploadPhotoHelp')}
          </p>
        </div>
        <span className="text-xs font-medium text-slate-400">
          {photos.length}/{maxPhotos}
        </span>
      </div>

      {/* Previews grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {photos.map((photoUrl, idx) => (
          <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-white aspect-square shadow-xs">
            <img src={photoUrl} alt={`Damage photo ${idx + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition"
              title="Remove photo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 hover:border-indigo-500 dark:hover:border-indigo-400 transition aspect-square text-center group cursor-pointer"
          >
            <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">Upload Photo</span>
            <span className="text-[10px] text-slate-400">JPG, PNG</span>
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        multiple
        className="hidden"
      />

      {/* Quick Demo Pre-fill Samples for Judges */}
      {photos.length < maxPhotos && (
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1">
            <ImageIcon className="w-3 h-3" /> Quick Demo Broken Item Samples:
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleDamagedPhotos.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => handleAddSample(sample.url)}
                className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition cursor-pointer"
              >
                + {sample.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
