import { useState } from 'react';

export default function GroundingExercise({ onComplete }) {
  const [activeStep, setActiveStep] = useState(5);
  const [completed, setCompleted] = useState([]);
  
  const steps = [
    { num: 5, label: 'SEE', icon: '👁', prompt: '5 things you can see around you' },
    { num: 4, label: 'TOUCH', icon: '✋', prompt: '4 things you can physically feel' },
    { num: 3, label: 'HEAR', icon: '👂', prompt: '3 sounds you can hear right now' },
    { num: 2, label: 'SMELL', icon: '👃', prompt: '2 things you can smell' },
    { num: 1, label: 'TASTE', icon: '👅', prompt: '1 thing you can taste' }
  ];

  const handleCompleteStep = (num) => {
    setCompleted([...completed, num]);
    if (num > 1) {
      setActiveStep(num - 1);
    } else {
      setActiveStep(0); // All done
      setTimeout(() => onComplete(), 1500);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto py-4">
      <div className="flex flex-col gap-4">
        {steps.map((step) => {
          const isCompleted = completed.includes(step.num);
          const isActive = activeStep === step.num;
          
          return (
            <div 
              key={step.num}
              className={`rounded-2xl transition-all duration-300 border ${
                isActive 
                  ? 'bg-white border-primary shadow-[0_8px_30px_rgba(140,179,140,0.2)] scale-[1.02]' 
                  : isCompleted
                    ? 'bg-primary/5 border-primary/20 opacity-70'
                    : 'bg-white/60 border-secondary/50 opacity-50'
              }`}
            >
              <div className="p-5 flex items-center justify-between cursor-pointer" onClick={() => !isCompleted && setActiveStep(step.num)}>
                <div className="flex items-center gap-4">
                  <span className={`text-2xl ${isCompleted ? 'grayscale opacity-50' : ''}`}>{step.icon}</span>
                  <h3 className={`font-medium tracking-wide ${isCompleted ? 'line-through text-text-light' : 'text-text-dark'}`}>
                    {isCompleted ? `✓ Completed ${step.label}` : `${step.num} things you can ${step.label}`}
                  </h3>
                </div>
              </div>
              
              {isActive && !isCompleted && (
                <div className="px-5 pb-6 animate-in slide-in-from-top-2 fade-in duration-300">
                  <p className="text-text-light text-sm mb-4">{step.prompt}. Just take a moment to notice them, you don't need to write them all down.</p>
                  
                  {/* We just provide a single input to engage the user without making them type 5 things fully if they don't want to, or just a button to confirm */}
                  <button 
                    onClick={() => handleCompleteStep(step.num)}
                    className="w-full bg-primary/10 hover:bg-primary/20 text-text-dark font-medium py-3 rounded-xl transition-colors text-sm"
                  >
                    I've noticed them
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {activeStep === 0 && (
        <div className="text-center text-primary font-medium mt-8 animate-in fade-in">
          Grounding complete. Moving forward...
        </div>
      )}
    </div>
  );
}
