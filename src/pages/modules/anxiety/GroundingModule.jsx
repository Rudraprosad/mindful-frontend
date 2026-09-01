import { useNavigate } from 'react-router-dom';
import GroundingExercise from '../../../components/modules/GroundingExercise';

export default function GroundingModule() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 w-full">
      <div className="text-center mb-8 max-w-lg">
        <h2 className="font-serif text-4xl font-semibold text-text-dark mb-4">Grounding</h2>
        <p className="text-text-light text-lg">
          Come back to the room using the 5-4-3-2-1 technique.
        </p>
      </div>
      
      <GroundingExercise onComplete={() => navigate('/modules/anxiety')} />
      
      <button 
        onClick={() => navigate('/modules/anxiety')}
        className="mt-12 text-text-light hover:text-text-dark underline"
      >
        Return to Dashboard
      </button>
    </div>
  );
}
