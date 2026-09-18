import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearToast } from '../../state/uiSlice';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const dispatch = useDispatch();
  const activeToast = useSelector((state) => state.ui.activeToast);

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activeToast, dispatch]);

  if (!activeToast) return null;

  const isSuccess = activeToast.type === 'success';
  const isError = activeToast.type === 'error';

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-sm animate-fade-in">
      <div
        className={`flex items-center gap-3 rounded-2xl p-4 shadow-xl border backdrop-blur-md ${
          isSuccess
            ? 'bg-emerald-900/90 text-white border-emerald-700'
            : isError
            ? 'bg-rose-900/90 text-white border-rose-700'
            : 'bg-slate-900/90 text-white border-slate-700'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-400 shrink-0" />}

        <p className="text-sm font-medium leading-snug flex-1">{activeToast.message}</p>

        <button
          onClick={() => dispatch(clearToast())}
          className="p-1 rounded-lg text-slate-300 hover:text-white transition"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
