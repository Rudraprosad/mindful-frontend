import { useNavigate } from 'react-router-dom';
import BoxBreathing from '../../../components/modules/BoxBreathing';

export default function BreathingModule() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 w-full">
      <div className="text-center mb-8 max-w-lg">
        <h2 className="font-serif text-4xl font-semibold text-text-dark mb-4">Somatic Reset</h2>
        <p className="text-text-light text-lg">
          Follow the shape with your breathing. Breathe in as it expands, hold, breathe out as it contracts.
        </p>
      </div>
      
      <BoxBreathing onComplete={() => navigate('/modules/anxiety')} />
      
      <button 
        onClick={() => navigate('/modules/anxiety')}
        className="mt-12 text-text-light hover:text-text-dark underline"
      >
        Return to Dashboard
      </button>
    </div>
  );
}
