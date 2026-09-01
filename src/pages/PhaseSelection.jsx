import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PhaseSelection() {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const navigate = useNavigate();

  const phases = [
    {
      id: 'teenager',
      title: 'TEENAGER (13-19)',
      description: 'Focusing on academic stress, peer support, identity, and personal growth.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      )
    },
    {
      id: 'couple',
      title: 'COUPLE / RELATIONSHIP',
      description: 'Exploring communication, attachment, and shared relationship challenges.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      )
    },
    {
      id: 'alone',
      title: 'ALONE / INDIVIDUAL',
      description: 'Addressing work burnout, social isolation, existential dread, and personal peace.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    }
  ];

  return (
    <main className="flex-1 flex flex-col justify-center items-center py-12 px-4 w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-lg md:text-2xl text-text-light max-w-2xl mx-auto">
          Select the option that best describes your current life phase, so we can tailor your experience with empathetic guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 w-full max-w-5xl">
        {phases.map((phase) => (
          <div 
            key={phase.id}
            onClick={() => setSelectedPhase(phase.id)}
            className={`
              flex flex-col items-center bg-white/70 backdrop-blur-md p-8 rounded-3xl cursor-pointer transition-all duration-300
              border-2 
              ${selectedPhase === phase.id 
                ? 'border-primary shadow-[0_10px_40px_rgba(140,179,140,0.3)] transform -translate-y-2' 
                : 'border-secondary/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-primary/50'
              }
            `}
          >
            {/* Soft circle for icon */}
            <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center mb-6">
              {phase.icon}
            </div>
            
            <h3 className="font-bold text-lg text-text-dark mb-3 text-center tracking-wide">
              {phase.title}
            </h3>
            
            <p className="text-text-light text-center mb-8 flex-1 text-sm leading-relaxed">
              {phase.description}
            </p>
            
            <button 
              className={`w-full py-3 rounded-full font-medium transition-all ${
                selectedPhase === phase.id 
                  ? 'bg-primary text-white shadow-[0_4px_14px_rgba(140,179,140,0.4)]' 
                  : 'bg-secondary text-text-dark hover:bg-primary/20'
              }`}
            >
              {selectedPhase === phase.id ? 'SELECTED' : 'SELECT'}
            </button>
          </div>
        ))}
      </div>

      <button 
        disabled={!selectedPhase}
        onClick={() => selectedPhase && navigate('/assessment', { state: { phase: selectedPhase } })}
        className={`px-12 py-4 rounded-full font-medium tracking-wide transition-all ${
          selectedPhase 
            ? 'bg-text-dark text-white cursor-pointer hover:bg-text-dark/90 shadow-lg hover:-translate-y-0.5' 
            : 'bg-secondary text-text-light/50 cursor-not-allowed'
        }`}
      >
        CONTINUE
      </button>
    </main>
  );
}
