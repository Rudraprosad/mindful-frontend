import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CognitiveReframe from '../../../components/modules/CognitiveReframe';

export default function ReframingModule() {
  const navigate = useNavigate();
  const [worry, setWorry] = useState('');
  const [step, setStep] = useState(1);

  return (
    <div className="flex-1 flex flex-col items-center py-12 px-4 w-full">
      {step === 1 && (
        <div className="text-center animate-in slide-in-from-right-4 w-full max-w-xl mt-12">
          <h2 className="font-serif text-4xl text-text-dark mb-4">Identify the Worry</h2>
          <p className="text-text-light text-lg mb-8">Anxiety often creates a prediction about what might happen. Let's put that prediction into words.</p>
          <textarea 
            value={worry}
            onChange={e => setWorry(e.target.value)}
            placeholder="I'm worried that..."
            className="w-full p-6 rounded-3xl border border-secondary bg-white/80 focus:ring-2 focus:ring-primary/50 text-lg min-h-[150px] shadow-sm mb-8"
          />
          <div className="flex justify-between w-full">
            <button 
              onClick={() => navigate('/modules/anxiety')}
              className="px-8 py-3 rounded-full bg-secondary text-text-dark font-medium transition-colors hover:bg-secondary/70"
            >
              Cancel
            </button>
            <button 
              disabled={!worry}
              onClick={() => setStep(2)} 
              className="px-10 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              Examine this worry
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="w-full mt-12">
          <CognitiveReframe 
            worry={worry} 
            onComplete={() => navigate('/modules/anxiety')} 
          />
        </div>
      )}
    </div>
  );
}
