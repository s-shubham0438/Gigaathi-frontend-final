import React from 'react';
import { Volume2, Sparkles, Eye, Check } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLowLiteracyMode } from '../../../shared/state/uiSlice';

export const LowLiteracyToggle = () => {
  const dispatch = useDispatch();
  const isLowLiteracy = useSelector((state) => state.ui.isLowLiteracyMode);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 dark:border-amber-900/60 dark:bg-amber-950/40">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
          <Volume2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1">
            सरल मोड / High Accessibility Mode
          </span>
          <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
            बड़े बटन और बोलकर सुनने की सुविधा (Extra large touch buttons & speech assistance)
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => dispatch(toggleLowLiteracyMode())}
        className={`flex h-8 w-14 items-center rounded-full p-1 transition duration-300 cursor-pointer ${
          isLowLiteracy ? 'bg-amber-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
        }`}
        aria-label="Toggle Low Digital Literacy Mode"
      >
        <span className="h-6 w-6 rounded-full bg-white shadow-md transform transition-transform" />
      </button>
    </div>
  );
};

export default LowLiteracyToggle;
