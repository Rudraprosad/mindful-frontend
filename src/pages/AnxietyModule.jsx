import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import BoxBreathing from '../components/modules/BoxBreathing';
import GroundingExercise from '../components/modules/GroundingExercise';
import CognitiveReframe from '../components/modules/CognitiveReframe';

const SAVE_PROGRESS = gql`
  mutation SaveModuleProgress($userId: ID!, $moduleType: String!, $initialScore: Int!, $finalScore: Int!) {
    saveModuleProgress(userId: $userId, moduleType: $moduleType, initialScore: $initialScore, finalScore: $finalScore) {
      id
    }
  }
`;


export default function AnxietyModule() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saveProgress] = useMutation(SAVE_PROGRESS);

  
  // State for all collected data throughout the module
  const [data, setData] = useState({
    initialAnxiety: 5,
    initialBodySensations: [],
    noticeSensations: [],
    sensationMessage: '',
    worry: '',
    balancedView: '',
    nextAction: '',
    finalAnxiety: 5
  });

  const updateData = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep(s => s + 1);

  // Helper for multi-select
  const toggleSelection = (field, item) => {
    const list = data[field];
    if (list.includes(item)) {
      updateData(field, list.filter(i => i !== item));
    } else {
      updateData(field, [...list, item]);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 w-full max-w-4xl mx-auto min-h-[80vh]">
      
      {/* 1. INITIAL CHECK IN */}
      {step === 1 && (
        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-sm border border-secondary/50 animate-in fade-in flex flex-col items-center">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-text-dark mb-12 text-center">
            How intense does your anxiety feel right now?
          </h1>
          
          <input 
            type="range" 
            min="0" max="10" 
            value={data.initialAnxiety}
            onChange={(e) => updateData('initialAnxiety', parseInt(e.target.value))}
            className="w-full h-3 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary mb-6"
          />
          <div className="flex justify-between w-full text-text-light font-medium px-2 mb-12">
            <span>Calm (0)</span>
            <span className="text-primary font-bold text-xl">{data.initialAnxiety}</span>
            <span>Extreme (10)</span>
          </div>

          <p className="text-text-dark font-medium mb-6">Where do you notice the anxiety most?</p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['❤️ Chest', '🫁 Breathing', '🧠 Thoughts', '🦵 Restlessness', '😵 Dizziness', '😣 Stomach', '✋ Hands'].map(s => (
              <button 
                key={s} 
                onClick={() => toggleSelection('initialBodySensations', s)}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  data.initialBodySensations.includes(s) 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white border-secondary text-text-dark hover:border-primary/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button onClick={handleNext} className="px-10 py-3 rounded-full bg-text-dark text-white font-medium hover:bg-black transition-colors">
            Continue
          </button>
        </div>
      )}

      {/* 2. SOMATIC RESET INTRO */}
      {step === 2 && (
        <div className="text-center animate-in slide-in-from-right-4 duration-500">
          <h2 className="font-serif text-4xl font-semibold text-text-dark mb-6">Let's slow things down.</h2>
          <p className="text-xl text-text-light max-w-lg mx-auto mb-12 leading-relaxed">
            When anxiety feels intense, your body becomes highly activated. Before trying to solve the thoughts, let's spend a few moments slowing things down.
          </p>
          <button onClick={handleNext} className="px-12 py-4 rounded-full bg-primary text-white text-lg font-medium shadow-[0_4px_14px_rgba(140,179,140,0.3)] hover:-translate-y-0.5 transition-all">
            Begin Reset
          </button>
        </div>
      )}

      {/* 3. BOX BREATHING */}
      {step === 3 && (
        <div className="w-full text-center animate-in fade-in">
          <h2 className="font-serif text-3xl text-text-dark mb-2">Follow the shape with your breathing.</h2>
          <p className="text-text-light mb-8">Breathe in as it expands, hold, breathe out as it contracts.</p>
          <BoxBreathing onComplete={handleNext} />
          <button onClick={handleNext} className="mt-8 text-text-light hover:text-text-dark text-sm underline transition-colors">
            Skip breathing
          </button>
        </div>
      )}

      {/* 4. NOTICE */}
      {step === 4 && (
        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-sm border border-secondary/50 animate-in fade-in">
          <h2 className="font-serif text-3xl text-text-dark mb-4 text-center">Notice what is happening.</h2>
          <p className="text-text-light mb-8 text-center">You don't have to make the feeling disappear. Just notice it.</p>
          
          <div className="mb-8">
            <p className="font-medium text-text-dark mb-4 text-center">My body feels...</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Tight', 'Restless', 'Heavy', 'Warm', 'Shaky', 'Tense', 'Numb', 'Fast'].map(s => (
                <button 
                  key={s} 
                  onClick={() => toggleSelection('noticeSensations', s)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    data.noticeSensations.includes(s) 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white border-secondary text-text-dark hover:border-primary/50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-center font-medium text-text-dark mb-4">If the sensation could speak, what would it say?</label>
            <input 
              value={data.sensationMessage}
              onChange={e => updateData('sensationMessage', e.target.value)}
              placeholder="e.g. I'm scared something will go wrong."
              className="w-full p-4 rounded-xl border border-secondary focus:ring-2 focus:ring-primary/50 bg-white"
            />
          </div>

          <div className="text-center">
            <button onClick={handleNext} className="px-10 py-3 rounded-full bg-text-dark text-white font-medium hover:bg-black transition-colors">
              Continue
            </button>
          </div>
        </div>
      )}

      {/* 5. GROUNDING */}
      {step === 5 && (
        <div className="w-full animate-in fade-in">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-text-dark mb-2">Come back to the room.</h2>
            <p className="text-text-light">Let's use the 5-4-3-2-1 grounding technique.</p>
          </div>
          <GroundingExercise onComplete={handleNext} />
        </div>
      )}

      {/* 6. IDENTIFY WORRY */}
      {step === 6 && (
        <div className="text-center animate-in slide-in-from-right-4 w-full max-w-xl">
          <h2 className="font-serif text-3xl text-text-dark mb-4">What is your mind worried about?</h2>
          <p className="text-text-light mb-8">Anxiety often creates a prediction about what might happen. Let's put that prediction into words.</p>
          <textarea 
            value={data.worry}
            onChange={e => updateData('worry', e.target.value)}
            placeholder="I'm worried that..."
            className="w-full p-6 rounded-3xl border border-secondary bg-white/80 focus:ring-2 focus:ring-primary/50 text-lg min-h-[150px] shadow-sm mb-8"
          />
          <button 
            disabled={!data.worry}
            onClick={handleNext} 
            className="px-10 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            Examine this worry
          </button>
        </div>
      )}

      {/* 7. COGNITIVE REFRAME */}
      {step === 7 && (
        <CognitiveReframe 
          worry={data.worry} 
          onComplete={(balancedView) => {
            updateData('balancedView', balancedView);
            handleNext();
          }} 
        />
      )}

      {/* 8. NEXT ACTION */}
      {step === 8 && (
        <div className="w-full max-w-3xl animate-in fade-in text-center">
          <h2 className="font-serif text-3xl text-text-dark mb-8">What would help you right now?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              { id: 'Regulate', icon: '🫁', desc: 'Do another 60-second breathing exercise.' },
              { id: 'Move', icon: '🚶', desc: 'Take a short walk or stretch.' },
              { id: 'Prepare', icon: '📝', desc: 'Take one small practical step toward the situation.' },
              { id: 'Connect', icon: '💬', desc: 'Talk to someone you trust.' },
              { id: 'Pause', icon: '🧘', desc: 'Give yourself permission to step away for a few minutes.' },
              { id: 'Continue', icon: '🎯', desc: 'Return to what you were doing, one small step at a time.' }
            ].map(action => (
              <div 
                key={action.id}
                onClick={() => updateData('nextAction', action.id)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  data.nextAction === action.id 
                    ? 'bg-primary/10 border-primary shadow-sm' 
                    : 'bg-white/60 border-secondary hover:bg-white hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{action.icon}</span>
                  <h4 className="font-bold text-text-dark">{action.id}</h4>
                </div>
                <p className="text-text-light text-sm">{action.desc}</p>
              </div>
            ))}
          </div>
          <button 
            disabled={!data.nextAction}
            onClick={handleNext}
            className="mt-10 px-10 py-3 rounded-full bg-text-dark text-white font-medium hover:bg-black transition-colors disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      )}

      {/* 9. FINAL CHECK IN */}
      {step === 9 && (
        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-sm border border-secondary/50 animate-in fade-in flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl font-semibold text-text-dark mb-6">Check in again.</h2>
          <p className="text-text-light mb-10">Earlier, you rated your anxiety as <strong className="text-text-dark">{data.initialAnxiety}/10</strong>. Where would you rate it now?</p>
          
          <input 
            type="range" 
            min="0" max="10" 
            value={data.finalAnxiety}
            onChange={(e) => updateData('finalAnxiety', parseInt(e.target.value))}
            className="w-full h-3 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary mb-6"
          />
          <div className="flex justify-between w-full text-text-light font-medium px-2 mb-12">
            <span>Calm (0)</span>
            <span className="text-primary font-bold text-xl">{data.finalAnxiety}</span>
            <span>Extreme (10)</span>
          </div>

          <div className="bg-secondary/30 p-6 rounded-2xl w-full mb-8 flex justify-center items-center gap-8">
            <div className="text-center">
              <span className="block text-sm text-text-light uppercase tracking-wider mb-1">Before</span>
              <span className="text-3xl font-bold text-text-dark">{data.initialAnxiety}</span>
            </div>
            <span className="text-2xl text-text-light">→</span>
            <div className="text-center">
              <span className="block text-sm text-text-light uppercase tracking-wider mb-1">After</span>
              <span className="text-3xl font-bold text-primary">{data.finalAnxiety}</span>
            </div>
          </div>

          <p className="text-text-dark mb-8 font-medium">
            {data.finalAnxiety < data.initialAnxiety 
              ? "You noticed your state, worked through the exercise, and checked in with yourself." 
              : "That's okay. Anxiety doesn't always decrease immediately. The goal was to give yourself a structured pause and a chance to respond differently."}
          </p>

          <button onClick={handleNext} className="px-10 py-3 rounded-full bg-text-dark text-white font-medium hover:bg-black transition-colors">
            Finish
          </button>
        </div>
      )}

      {/* 10. FINAL SUMMARY */}
      {step === 10 && (
        <div className="w-full max-w-md bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-secondary animate-in slide-in-from-bottom-8">
          <div className="text-center mb-8 border-b border-secondary/50 pb-6">
            <h2 className="font-serif text-2xl tracking-widest text-text-dark uppercase mb-2">Reset Complete</h2>
            <p className="text-text-light text-sm">Well done on taking time for yourself.</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-2">
              <span className="text-text-dark font-medium">Anxiety Check</span>
              <span className="font-bold text-primary">{data.initialAnxiety} → {data.finalAnxiety}</span>
            </div>
            <ul className="space-y-3 text-text-light text-sm">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Breathing completed</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Grounding completed</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Identified worry</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Examined evidence</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Chose next action: {data.nextAction}</li>
            </ul>
          </div>

          <div className="bg-primary/5 p-5 rounded-xl mb-8 border border-primary/20">
            <span className="block text-xs uppercase tracking-wider text-text-light mb-2">Your Balanced Thought</span>
            <p className="text-text-dark font-serif italic text-sm leading-relaxed">
              "{data.balancedView}"
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={async () => {
                try {
                  await saveProgress({
                    variables: {
                      userId: "60d5ecb8b392d733c8b12345",
                      moduleType: "Anxiety",
                      initialScore: data.initialAnxiety,
                      finalScore: data.finalAnxiety
                    }
                  });
                  navigate('/modules/anxiety'); // Go to dashboard route
                } catch (err) {
                  console.error("Error saving progress:", err);
                }
              }}
              className="w-full py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
            >
              Save Reflection
            </button>

            <button onClick={() => navigate('/')} className="w-full py-3 rounded-full bg-secondary text-text-dark font-medium hover:bg-secondary/70 transition-colors">
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
