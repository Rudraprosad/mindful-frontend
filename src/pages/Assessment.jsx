import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const questions = [
  "How often do you experience persistent feelings of tension, worry, or fear that interfere with your everyday tasks?",
  "How often do you experience recurrent, intrusive thoughts that make you feel compelled to perform repetitive behaviors?",
  "How often do you feel a deep sense of sadness, hopelessness, or loss of interest in activities you usually enjoy?",
  "How often do you experience extreme shifts in your mood, moving from periods of deep sadness to feeling unusually high, elated, or energetic?",
  "How often do you experience things that others do not (like hearing voices) or feel like you are losing touch with reality?",
  "How often do you experience an intense preoccupation with your body weight, shape, or food intake?",
  "How often do you feel unable to control your use of substances like alcohol or drugs, even when it causes problems in your life?"
];

const options = [
  { text: "Never", value: 1 },
  { text: "Sometimes", value: 2 },
  { text: "Often", value: 3 },
  { text: "Nearly every day", value: 4 }
];

export default function Assessment() {
  const [step, setStep] = useState(1);
  const [scores, setScores] = useState({});
  const [crisisAnswer, setCrisisAnswer] = useState(null);
  const [isCrisis, setIsCrisis] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const phase = location.state?.phase || 'unknown';

  const handleNext = async () => {
    if (step <= 7) {
      setStep(step + 1);
    } else if (step === 8) {
      if (crisisAnswer === 'Yes') {
        setIsCrisis(true);
      } else {
        await submitAssessment();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      if (isCrisis) setIsCrisis(false);
      else setStep(step - 1);
    } else {
      navigate('/phase');
    }
  };

  const submitAssessment = async () => {
    setLoading(true);
    
    // Construct the prompt for the LLM
    const prompt = `The user is in the life phase: ${phase}. 
    Here are their psychological assessment scores (1=Never, 4=Nearly every day):
    Q1 (Anxiety): ${scores[1]}
    Q2 (OCD): ${scores[2]}
    Q3 (Depression): ${scores[3]}
    Q4 (Bipolar): ${scores[4]}
    Q5 (Psychosis): ${scores[5]}
    Q6 (Eating Disorders): ${scores[6]}
    Q7 (Addictions): ${scores[7]}
    
    Based on these responses, generate a personalized mental wellness learning plan. 
    Return your response ONLY in valid JSON format with the following structure exactly (no markdown formatting):
    {
      "category": "Anxiety" (must be exactly one of: Anxiety, OCD, Depression, Bipolar, Psychosis, EatingDisorders), 
      "plan": [
        { "title": "Step 1 title", "description": "Step 1 description" },
        { "title": "Step 2 title", "description": "Step 2 description" },
        { "title": "Step 3 title", "description": "Step 3 description" }
      ]
    }`;

    try {
      const response = await fetch('http://localhost:8000/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, scores, phase, userId: "60d5ecb8b392d733c8b12345" })
      });

      const data = await response.json();
      
      const aiResult = data.parsedCategory || "anxiety";
      const learningPlan = data.parsedPlan || [];

      // Save condition to backend
      try {
        await fetch('http://localhost:8000/api/users/update-condition', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ condition: aiResult.replace(/\s+/g, '').toLowerCase() })
        });
      } catch (e) {
        console.error("Failed to save condition", e);
      }

      // Navigate to the learning plan page with the generated data
      navigate('/plan', { state: { category: aiResult, plan: learningPlan } });

    } catch (err) {
      console.error("Error fetching AI response", err);
      // Fallback
      window.location.href = '/modules/anxiety';
    } finally {
      setLoading(false);
    }
  };

  if (isCrisis) {
    return (
      <main className="flex-1 flex flex-col justify-center items-center py-12 px-4 w-full">
        <div className="w-full max-w-xl bg-red-50 p-8 rounded-3xl border border-red-200 text-center shadow-lg">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
            ⚠️
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-4">You are not alone.</h2>
          <p className="text-red-900 mb-8">
            It sounds like you are going through a very difficult time. Your safety is the most important thing right now. Please reach out to someone who can help immediately.
          </p>
          
          <div className="bg-white p-6 rounded-xl border border-red-100 mb-6 text-left">
            <h3 className="font-bold text-gray-800 mb-2">Emergency Contacts</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">National Suicide Prevention Lifeline</span>
                <a href="tel:988" className="font-bold text-red-600 bg-red-50 px-4 py-2 rounded-lg">988</a>
              </li>
              <li className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Crisis Text Line</span>
                <span className="font-bold text-red-600 bg-red-50 px-4 py-2 rounded-lg">Text HOME to 741741</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Emergency Services</span>
                <a href="tel:911" className="font-bold text-red-600 bg-red-50 px-4 py-2 rounded-lg">911</a>
              </li>
            </ul>
          </div>
          
          <button 
            onClick={() => setIsCrisis(false)}
            className="text-gray-500 hover:text-gray-700 underline text-sm"
          >
            Go back to the assessment
          </button>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex-1 flex flex-col justify-center items-center py-12 px-4 w-full">
        <div className="w-16 h-16 border-4 border-secondary border-t-primary rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-serif text-text-dark">Analyzing your responses...</h2>
        <p className="text-text-light text-sm mt-2">Our AI is designing the best path for you.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col justify-center items-center py-12 px-4 w-full max-w-4xl mx-auto">
      
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-12">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-light uppercase tracking-wider">Question {step} of 8</span>
          <span className="text-sm font-medium text-text-light">{Math.round((step / 8) * 100)}%</span>
        </div>
        <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${(step / 8) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-secondary/50 relative overflow-hidden">
        
        {step <= 7 ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 key={step}">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-text-dark mb-8 tracking-tight leading-relaxed">
              {questions[step - 1]}
            </h2>
            
            <div className="flex flex-col gap-3">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setScores({ ...scores, [step]: opt.value })}
                  className={`text-left px-6 py-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                    scores[step] === opt.value 
                      ? 'bg-primary/10 border-primary text-text-dark shadow-sm' 
                      : 'bg-white border-secondary/60 text-text-light hover:border-primary/40 hover:bg-white'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border flex flex-shrink-0 items-center justify-center ${
                    scores[step] === opt.value ? 'border-primary bg-primary' : 'border-gray-300'
                  }`}>
                    {scores[step] === opt.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="font-medium text-lg">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Step 8: Crisis Question
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-text-dark mb-8 tracking-tight leading-relaxed">
              Are you currently in immediate danger or thinking about seriously harming yourself or someone else?
            </h2>
            
            <div className="flex flex-col gap-3">
              {['No', "I'm not sure", 'Yes'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setCrisisAnswer(opt)}
                  className={`text-left px-6 py-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                    crisisAnswer === opt 
                      ? 'bg-primary/10 border-primary text-text-dark shadow-sm' 
                      : 'bg-white border-secondary/60 text-text-light hover:border-primary/40 hover:bg-white'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border flex flex-shrink-0 items-center justify-center ${
                    crisisAnswer === opt ? 'border-primary bg-primary' : 'border-gray-300'
                  }`}>
                    {crisisAnswer === opt && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="font-medium text-lg">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center w-full max-w-2xl mt-8">
        <button 
          onClick={handleBack}
          className="px-8 py-3 rounded-full font-medium text-text-light hover:text-text-dark transition-colors cursor-pointer"
        >
          Back
        </button>
        
        <button 
          onClick={handleNext}
          disabled={(step <= 7 && !scores[step]) || (step === 8 && !crisisAnswer)}
          className={`px-10 py-3.5 rounded-full font-medium tracking-wide transition-all ${
            ((step <= 7 && scores[step]) || (step === 8 && crisisAnswer))
              ? 'bg-primary text-white cursor-pointer hover:bg-primary-hover shadow-[0_4px_14px_rgba(140,179,140,0.3)] hover:-translate-y-0.5' 
              : 'bg-secondary text-text-light/50 cursor-not-allowed'
          }`}
        >
          {step === 8 ? (crisisAnswer === 'Yes' ? 'GET HELP' : 'FINISH') : 'NEXT'}
        </button>
      </div>

    </main>
  );
}
