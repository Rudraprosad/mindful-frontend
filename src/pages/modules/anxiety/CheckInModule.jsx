import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckInModule() {
  const navigate = useNavigate();
  const [anxiety, setAnxiety] = useState(5);
  const [sensations, setSensations] = useState([]);
  const [message, setMessage] = useState('');

  const toggleSensation = (s) => {
    if (sensations.includes(s)) setSensations(sensations.filter(x => x !== s));
    else setSensations([...sensations, s]);
  };

  const handleComplete = () => {
    // In a real app, save to context/backend
    navigate('/modules/anxiety');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 w-full max-w-2xl mx-auto">
      <div className="w-full bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-sm border border-secondary/50 flex flex-col items-center">
        <h1 className="font-serif text-3xl font-semibold text-text-dark mb-12 text-center">
          How intense does your anxiety feel right now?
        </h1>
        
        <input 
          type="range" min="0" max="10" 
          value={anxiety} onChange={(e) => setAnxiety(parseInt(e.target.value))}
          className="w-full h-3 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary mb-6"
        />
        <div className="flex justify-between w-full text-text-light font-medium px-2 mb-12">
          <span>Calm (0)</span>
          <span className="text-primary font-bold text-xl">{anxiety}</span>
          <span>Extreme (10)</span>
        </div>

        <p className="text-text-dark font-medium mb-4">Where do you notice it most?</p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['❤️ Chest', '🫁 Breathing', '🧠 Thoughts', '🦵 Restlessness', '😵 Dizziness', '😣 Stomach'].map(s => (
            <button 
              key={s} onClick={() => toggleSensation(s)}
              className={`px-4 py-2 rounded-full border transition-colors ${
                sensations.includes(s) ? 'bg-primary text-white border-primary' : 'bg-white border-secondary text-text-dark'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="text-text-dark font-medium mb-4">If the sensation could speak, what would it say?</p>
        <input 
          value={message} onChange={e => setMessage(e.target.value)}
          placeholder="I'm scared something will go wrong..."
          className="w-full p-4 rounded-xl border border-secondary bg-white mb-10"
        />

        <button onClick={handleComplete} className="px-10 py-3 rounded-full bg-text-dark text-white font-medium hover:bg-black transition-colors w-full">
          Complete Check-In
        </button>
      </div>
    </div>
  );
}
