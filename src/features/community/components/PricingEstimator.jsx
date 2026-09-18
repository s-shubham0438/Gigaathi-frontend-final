import React from 'react';
import { Calculator, Check, ShieldCheck } from 'lucide-react';

export const PricingEstimator = ({ areaType, cleaningType, areaRange, onPriceCalculated }) => {
  const baseRates = {
    LITTER_PICKUP: 299,
    DEEP_SWEEPING: 499,
    DEBRIS_REMOVAL: 899,
    DISINFECTION_SPRAY: 599,
    DRAIN_DESILTING: 799,
  };

  const areaMultipliers = {
    STREET: 1.0,
    PARK: 1.25,
    SOCIETY_COMPOUND: 1.15,
    MARKET: 1.4,
    DRAINAGE: 1.6,
    WASTE_DUMP: 1.5,
  };

  const rangeMultipliers = {
    '50m': 1.0,
    '100m': 1.5,
    '250m': 2.2,
    '500m+': 3.5,
    SMALL: 1.0,
    MEDIUM: 1.5,
    LARGE: 2.3,
  };

  const basePrice = baseRates[cleaningType] || 399;
  const areaMult = areaMultipliers[areaType] || 1.0;
  const rangeMult = rangeMultipliers[areaRange] || 1.2;

  const estimatedTotal = Math.round(basePrice * areaMult * rangeMult);

  React.useEffect(() => {
    if (onPriceCalculated) {
      onPriceCalculated(estimatedTotal);
    }
  }, [estimatedTotal, onPriceCalculated]);

  return (
    <div className="rounded-2xl border border-indigo-100 dark:border-indigo-950/60 bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-900 dark:to-indigo-950/20 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Fair Rate Estimator</h4>
            <p className="text-[11px] text-slate-500">Regulated community cleaning pricing standard</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹{estimatedTotal}</span>
          <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Fixed Fair Wage Guarantee</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-200/60 dark:border-slate-800">
        <div>
          <span className="text-slate-400 block">Base Task:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">₹{basePrice}</span>
        </div>
        <div>
          <span className="text-slate-400 block">Terrain Factor:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">{areaMult}x</span>
        </div>
        <div>
          <span className="text-slate-400 block">Scale Factor:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">{rangeMult}x</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>100% of this payment goes directly to local Saathi workers with zero hidden platform cut.</span>
      </div>
    </div>
  );
};

export default PricingEstimator;
