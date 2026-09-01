import { useLocation, useNavigate } from 'react-router-dom';

export default function LearningPlan() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Default fallback data in case the user navigates directly without state
  const { category = "anxiety", plan = [] } = location.state || {};

  const handleContinue = () => {
    const routeSuffix = category.replace(/\s+/g, '').toLowerCase();
    navigate(`/modules/${routeSuffix}`);
  };

  return (
    <main className="flex-1 flex flex-col items-center py-12 px-4 w-full max-w-4xl mx-auto">
      <div className="w-full mb-10 animate-in fade-in">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-dark mb-4 text-center">
          Your Personalized Plan
        </h1>
        <p className="text-xl text-text-light text-center">
          Based on your assessment, we identified {category.toLowerCase()} as a primary focus. Here is a custom plan designed to help you.
        </p>
      </div>

      <div className="w-full space-y-6">
        {plan && plan.length > 0 ? (
          plan.map((step, index) => (
            <div 
              key={index}
              className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-secondary/50 shadow-sm animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-text-dark mb-2">{step.title}</h3>
                  <p className="text-text-light leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-secondary/50 shadow-sm text-center">
            <p className="text-text-light">No personalized plan could be generated at this time. Please proceed to the dashboard for general exercises.</p>
          </div>
        )}
      </div>

      <div className="mt-12 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
        <button 
          onClick={handleContinue}
          className="px-10 py-4 bg-primary text-white rounded-full font-medium tracking-wide shadow-[0_4px_14px_rgba(140,179,140,0.4)] hover:-translate-y-1 transition-all cursor-pointer"
        >
          Continue to Dashboard
        </button>
      </div>
    </main>
  );
}
