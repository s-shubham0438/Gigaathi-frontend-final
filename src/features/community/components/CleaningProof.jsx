import React, { useState } from 'react';
import { Camera, UploadCloud, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { uploadToImageKit } from '../../../shared/lib/imageKitService';

export const CleaningProof = ({
  bookingId,
  existingProofBefore = [],
  existingProofAfter = [],
  isWorker = false,
  onSaveProof,
  readOnly = false,
}) => {
  const [proofBefore, setProofBefore] = useState(existingProofBefore);
  const [proofAfter, setProofAfter] = useState(existingProofAfter);
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpload = async (e, type) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsUploading(true);
    try {
      for (const file of files) {
        const result = await uploadToImageKit(file, `cleaning_${type}_${Date.now()}.jpg`, ['proof', type]);
        if (type === 'before') {
          setProofBefore((prev) => [...prev, result.url]);
        } else {
          setProofAfter((prev) => [...prev, result.url]);
        }
      }
    } catch (err) {
      console.error('Failed to upload proof image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (type, index) => {
    if (readOnly) return;
    if (type === 'before') {
      setProofBefore((prev) => prev.filter((_, i) => i !== index));
    } else {
      setProofAfter((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (onSaveProof) {
      await onSaveProof({
        proofBefore,
        proofAfter,
        workerNotes: notes,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-600" />
            Before & After Verification Proofs
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Visual proof verified via ImageKit CDN ensuring transparent community sanitation.
          </p>
        </div>
        {savedSuccess && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Proofs Updated
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before Cleaning */}
        <div className="space-y-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Before Cleaning
            </span>
            <span className="text-xs text-amber-600 font-medium">({proofBefore.length} Photos)</span>
          </div>

          <div className="grid grid-cols-2 gap-2 min-h-[110px]">
            {proofBefore.map((img, idx) => (
              <div key={idx} className="relative rounded-lg overflow-hidden border border-amber-200 aspect-video group">
                <img src={img} alt="Before" className="w-full h-full object-cover" />
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => handleRemove('before', idx)}
                    className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full hover:bg-rose-600 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            {!readOnly && (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-amber-300 dark:border-amber-800 rounded-lg p-2 text-center cursor-pointer hover:bg-amber-100/50 transition">
                <UploadCloud className="w-5 h-5 text-amber-600" />
                <span className="text-[11px] font-medium text-amber-800 dark:text-amber-300 mt-1">Add Before Photo</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleUpload(e, 'before')}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
        </div>

        {/* After Cleaning */}
        <div className="space-y-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> After Cleaning
            </span>
            <span className="text-xs text-emerald-600 font-medium">({proofAfter.length} Photos)</span>
          </div>

          <div className="grid grid-cols-2 gap-2 min-h-[110px]">
            {proofAfter.map((img, idx) => (
              <div key={idx} className="relative rounded-lg overflow-hidden border border-emerald-200 aspect-video group">
                <img src={img} alt="After" className="w-full h-full object-cover" />
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => handleRemove('after', idx)}
                    className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full hover:bg-rose-600 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            {!readOnly && (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 dark:border-emerald-800 rounded-lg p-2 text-center cursor-pointer hover:bg-emerald-100/50 transition">
                <UploadCloud className="w-5 h-5 text-emerald-600" />
                <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 mt-1">Add After Photo</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleUpload(e, 'after')}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {!readOnly && isWorker && (
        <div className="pt-2 space-y-3">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Work Completion Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="E.g. Cleaned 120m stretch, collected 4 sacks of plastic waste, chlorinated open drains..."
            rows={2}
            className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUploading}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold tracking-wide uppercase shadow-md transition disabled:opacity-50"
          >
            {isUploading ? 'Uploading to ImageKit...' : 'Save & Submit Proofs'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CleaningProof;
