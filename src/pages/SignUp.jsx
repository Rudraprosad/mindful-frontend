import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // We'll map this to username in the backend
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username: email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login page on success
        navigate('/login');
      } else {
        setError(data.message || 'Failed to create account');
      }
    } catch {
      setError('Network error, please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col justify-center items-center py-16 px-4 w-full max-w-md mx-auto">
      <div className="w-full bg-white/50 backdrop-blur-sm p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-secondary/50">
        <h2 className="font-serif text-3xl font-semibold text-text-dark mb-2 text-center tracking-tight">
          Create an account
        </h2>
        <p className="text-text-light text-center mb-8">
          Begin your journey to well-being today.
        </p>

        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-text-dark ml-1">Name</label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name" 
              className="px-4 py-3 rounded-2xl bg-white border border-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-text-dark placeholder-text-light/60"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-text-dark ml-1">Email</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-2xl bg-white border border-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-text-dark placeholder-text-light/60"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-text-dark ml-1">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Create a password" 
              className="px-4 py-3 rounded-2xl bg-white border border-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-text-dark placeholder-text-light/60"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="mt-4 bg-primary text-white text-lg px-6 py-3.5 rounded-full font-medium transition-all cursor-pointer shadow-[0_4px_14px_rgba(140,179,140,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(140,179,140,0.4)] disabled:opacity-70"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-text-light mt-8 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:text-primary-hover transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
