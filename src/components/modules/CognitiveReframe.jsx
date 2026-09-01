import { useState } from 'react';

export default function CognitiveReframe({ worry, onComplete }) {
  const [step, setStep] = useState(1);
  const [worstCase, setWorstCase] = useState('');
  const [bestCase, setBestCase] = useState('');
  const [mostLikely, setMostLikely] = useState('');
  const [evidenceSupport, setEvidenceSupport] = useState('');
  const [evidenceChallenge, setEvidenceChallenge] = useState('');

  const handleNext = () => setStep(step + 1);

  // Simple simulated "AI" reflection based on user inputs
  const simulatedBalancedView = `You're worried that "${worry}". You recognize that the worst case might be "${worstCase}", but also that it could go well ("${bestCase}"). Given the evidence you've noticed ("${evidenceChallenge}"), a fair and balanced perspective is likely: "${mostLikely}".`;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 1. Worst Case */}
      {step === 1 && (
        <div className="animate-in fade-in duration-500 flex flex-col items-center text-center">
          <h3 className="font-serif text-2xl text-text-dark mb-4">Let's go all the way to the worst case.</h3>
          <p className="text-text-light mb-8">If your fear came true, what is the worst realistic outcome you imagine?</p>
          <textarea 
            value={worstCase}
            onChange={(e) => setWorstCase(e.target.value)}
            className="w-full p-4 rounded-2xl border border-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-dark min-h-[120px] mb-6"
            placeholder="What is the worst realistic outcome?"
          />
          <button 
            disabled={!worstCase}
            onClick={handleNext}
            className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* 2. Best Case */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center text-center">
          <h3 className="font-serif text-2xl text-text-dark mb-4">Now imagine the other direction.</h3>
          <p className="text-text-light mb-8">If things went better than expected, what could happen?</p>
          <textarea 
            value={bestCase}
            onChange={(e) => setBestCase(e.target.value)}
            className="w-full p-4 rounded-2xl border border-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-dark min-h-[120px] mb-6"
            placeholder="What is the best realistic outcome?"
          />
          <button 
            disabled={!bestCase}
            onClick={handleNext}
            className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* 3. Evidence Check */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center text-center">
          <h3 className="font-serif text-2xl text-text-dark mb-4">Examine the Evidence</h3>
          
          <div className="w-full text-left mb-6">
            <label className="block text-sm font-medium text-text-dark mb-2">What evidence supports your worry?</label>
            <input 
              value={evidenceSupport}
              onChange={(e) => setEvidenceSupport(e.target.value)}
              className="w-full p-3 rounded-xl border border-secondary bg-white focus:ring-2 focus:ring-primary/50 text-text-dark"
              placeholder="e.g. I have struggled with this before..."
            />
          </div>

          <div className="w-full text-left mb-8">
            <label className="block text-sm font-medium text-text-dark mb-2">What evidence challenges your worry?</label>
            <input 
              value={evidenceChallenge}
              onChange={(e) => setEvidenceChallenge(e.target.value)}
              className="w-full p-3 rounded-xl border border-secondary bg-white focus:ring-2 focus:ring-primary/50 text-text-dark"
              placeholder="e.g. I have prepared, people are usually understanding..."
            />
          </div>

          <button 
            disabled={!evidenceSupport || !evidenceChallenge}
            onClick={handleNext}
            className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* 4. Most Likely */}
      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center text-center">
          <h3 className="font-serif text-2xl text-text-dark mb-4">Now step back.</h3>
          <p className="text-text-light mb-8">Based on the evidence you just explored, what is the **most likely** outcome?</p>
          <textarea 
            value={mostLikely}
            onChange={(e) => setMostLikely(e.target.value)}
            className="w-full p-4 rounded-2xl border border-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-dark min-h-[120px] mb-6"
            placeholder="The most likely scenario is..."
          />
          <button 
            disabled={!mostLikely}
            onClick={handleNext}
            className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            Generate Balanced View
          </button>
        </div>
      )}

      {/* 5. Balanced View Validation */}
      {step === 5 && (
        <div className="animate-in fade-in scale-95 duration-500 flex flex-col items-center text-center bg-secondary/30 p-8 rounded-3xl border border-primary/20">
          <h3 className="font-serif text-2xl text-text-dark mb-6">A more balanced perspective</h3>
          <p className="text-lg text-text-dark/90 leading-relaxed mb-8 italic">
            "{simulatedBalancedView}"
          </p>
          
          <p className="text-text-light mb-4">Does this perspective feel fair to you?</p>
          <div className="flex gap-4">
            <button 
              onClick={() => onComplete(simulatedBalancedView)}
              className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-hover transition-all shadow-md hover:-translate-y-0.5"
            >
              ✓ Yes, that's fair
            </button>
            <button 
              onClick={() => setStep(4)}
              className="px-6 py-3 rounded-full bg-white text-text-dark border border-secondary font-medium hover:bg-secondary/50 transition-colors"
            >
              ✎ Edit it myself
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
