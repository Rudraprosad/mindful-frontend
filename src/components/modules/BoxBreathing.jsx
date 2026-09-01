import { useState, useEffect } from 'react';

export default function BoxBreathing({ onComplete }) {
  const [phase, setPhase] = useState('getReady');
  const [cycle, setCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const totalCycles = 4;
  const scale = phase === 'inhale' ? 1.5 : 1;

  useEffect(() => {
    let timer;
    if (phase === 'getReady') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        timer = setTimeout(() => {
          setPhase('inhale');
          setTimeLeft(4);
          setCycle(1);
        }, 0);
      }
    } else if (cycle <= totalCycles) {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        // Transition to next phase
        switch (phase) {
            case 'inhale':
              timer = setTimeout(() => { setPhase('hold1'); setTimeLeft(4); }, 0);
              break;
            case 'hold1':
              timer = setTimeout(() => { setPhase('exhale'); setTimeLeft(4); }, 0);
              break;
            case 'exhale':
              timer = setTimeout(() => { setPhase('hold2'); setTimeLeft(4); }, 0);
              break;
            case 'hold2':
              if (cycle < totalCycles) {
                timer = setTimeout(() => { setPhase('inhale'); setTimeLeft(4); setCycle(cycle + 1); }, 0);
              } else {
                timer = setTimeout(() => { setPhase('complete'); }, 0);
              }
              break;
          default:
            break;
        }
      }
    } else if (phase === 'complete') {
      timer = setTimeout(() => onComplete(), 2000);
    }

    return () => clearTimeout(timer);
  }, [phase, timeLeft, cycle, onComplete]);



  const getPhaseText = () => {
    switch (phase) {
      case 'getReady': return 'Get Ready';
      case 'inhale': return 'Breathe In';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
      case 'complete': return 'Well done';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Animation Container */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        {/* The expanding/contracting shape */}
        <div 
          className="absolute w-40 h-40 rounded-full bg-primary/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(140,179,140,0.5)] border border-primary/40"
          style={{
            transform: `scale(${scale})`,
            transition: 'transform 4s linear'
          }}
        >
          {/* Inner solid circle */}
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg relative overflow-hidden">
             {/* Subtle gradient overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
          </div>
        </div>
        
        {/* Text overlay */}
        <div className="absolute z-10 flex flex-col items-center pointer-events-none">
          <span className="text-text-dark font-serif text-2xl tracking-wide mb-1 drop-shadow-sm">
            {getPhaseText()}
          </span>
          <span className="text-text-dark/80 font-bold text-xl h-8">
            {phase !== 'complete' && timeLeft}
          </span>
        </div>
      </div>

      {/* Progress */}
      {phase !== 'getReady' && phase !== 'complete' && (
        <div className="flex flex-col items-center animate-in fade-in duration-700">
          <span className="text-text-light font-medium uppercase tracking-widest text-sm mb-3">
            Cycle {cycle} of {totalCycles}
          </span>
          <div className="flex gap-2">
            {[...Array(totalCycles)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i < cycle ? 'bg-primary scale-125' : 'bg-secondary'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {phase === 'complete' && (
        <div className="text-primary font-medium animate-in slide-in-from-bottom-4 duration-500">
          Continuing to next step...
        </div>
      )}
    </div>
  );
}
