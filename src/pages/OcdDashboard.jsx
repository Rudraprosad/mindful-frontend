import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery, gql } from '@apollo/client';

const GET_USER_PROGRESS = gql`
  query GetUserProgress($userId: ID!) {
    getUserProgress(userId: $userId) {
      id
      moduleType
      initialScore
      finalScore
      createdAt
    }
  }
`;


export default function OcdDashboard() {
  const navigate = useNavigate();

  const { data } = useQuery(GET_USER_PROGRESS, {
    variables: { userId: "60d5ecb8b392d733c8b12345" },
    fetchPolicy: 'network-only'
  });

  const chartData = (data?.getUserProgress && data.getUserProgress.length > 0) ? data.getUserProgress.map((p, index) => {
    const date = new Date(Number(p.createdAt));
    const isDateValid = !isNaN(date.getTime());
    return {
      name: isDateValid ? date.toLocaleDateString(undefined, { weekday: 'short' }) : `S${index + 1}`,
      before: p.initialScore,
      after: p.finalScore
    };
  }) : [
    { name: 'Mon', before: 8, after: 6 },
    { name: 'Tue', before: 7, after: 5 },
    { name: 'Wed', before: 8, after: 4 },
    { name: 'Thu', before: 6, after: 3 },
    { name: 'Fri', before: 7, after: 4 },
    { name: 'Sat', before: 5, after: 2 },
    { name: 'Sun', before: 6, after: 3 },
  ];


  const modules = [
    {
      id: 'checkin',
      title: 'State Check-In',
      description: 'Identify your current emotional and physical state.',
      icon: '📊',
      route: '/modules/anxiety/checkin',
      status: 'Start'
    },
    {
      id: 'breathing',
      title: 'Somatic Reset',
      description: 'Slow your nervous system with guided box breathing.',
      icon: '🫁',
      route: '/modules/anxiety/breathing',
      status: 'Start'
    },
    {
      id: 'grounding',
      title: 'Grounding 5-4-3-2-1',
      description: 'Bring your awareness back to the present moment.',
      icon: '👁️',
      route: '/modules/anxiety/grounding',
      status: 'Start'
    },
    {
      id: 'reframing',
      title: 'Cognitive Reframe',
      description: 'Examine worries and build a balanced perspective.',
      icon: '🧠',
      route: '/modules/anxiety/reframing',
      status: 'Start'
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center py-12 px-4 w-full max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="w-full mb-10 animate-in fade-in">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-dark mb-4">OCD Dashboard</h1>
        <p className="text-xl text-text-light max-w-2xl">
          Welcome back. Choose a module to help manage compulsive thoughts and behaviors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        
        {/* Left Column: Modules */}
        <div className="lg:col-span-2 flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold text-text-dark mb-2">Available Modules</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules.map(mod => (
              <div 
                key={mod.id}
                onClick={() => navigate(mod.route)}
                className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-secondary/50 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/50 transition-all cursor-pointer flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-2xl flex items-center justify-center">
                    {mod.icon}
                  </div>
                  <h3 className="font-bold text-lg text-text-dark">{mod.title}</h3>
                </div>
                <p className="text-text-light text-sm flex-1 mb-6 leading-relaxed">
                  {mod.description}
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {mod.status}
                  </span>
                  <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Progress Chart */}
        <div className="lg:col-span-1 animate-in slide-in-from-right-4 duration-700">
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-secondary/50 shadow-sm h-full flex flex-col">
            <h2 className="text-xl font-bold text-text-dark mb-2">Your Progress</h2>
            <p className="text-text-light text-sm mb-8">Compulsion intensity before and after sessions.</p>
            
            <div className="flex-1 min-h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d1d5db" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#d1d5db" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8cb38c" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8cb38c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="before" name="Before Session" stroke="#9ca3af" fillOpacity={1} fill="url(#colorBefore)" />
                  <Area type="monotone" dataKey="after" name="After Session" stroke="#8cb38c" fillOpacity={1} fill="url(#colorAfter)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-xs text-text-light">Before</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs text-text-light">After</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
