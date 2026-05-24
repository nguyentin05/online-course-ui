import { CheckCircle } from 'lucide-react';

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
          i + 1 < currentStep ? 'bg-brand text-white' :
          i + 1 === currentStep ? 'bg-brand text-white ring-4 ring-brand/20' :
          'bg-gray-100 text-gray-400'
        }`}>
          {i + 1 < currentStep ? <CheckCircle size={16} /> : i + 1}
        </div>
        {i < totalSteps - 1 && (
          <div className={`w-12 h-0.5 transition-all ${i + 1 < currentStep ? 'bg-brand' : 'bg-gray-200'}`} />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;