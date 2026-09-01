import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // To set cookies from a different port, we need credentials: 'include'
        credentials: 'include',
        body: JSON.stringify({ username: email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Store user in localStorage as fallback for cross-site cookie issues
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.token) localStorage.setItem('token', data.token);

        if (data.user && data.user.condition) {
          navigate(`/modules/${data.user.condition.toLowerCase()}`, { replace: true });
        } else {
          navigate('/phase', { replace: true });
        }
      } else {
        setError(data.message || 'Invalid credentials');
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
          Welcome back
        </h2>
        <p className="text-text-light text-center mb-8">
          Please enter your details to sign in.
        </p>

        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-text-dark ml-1">Email / Username</label>
            <input 
              type="text" 
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
              placeholder="••••••••" 
              className="px-4 py-3 rounded-2xl bg-white border border-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-text-dark placeholder-text-light/60"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm px-1">
            <label className="flex items-center gap-2 cursor-pointer text-text-light hover:text-text-dark transition-colors">
              <input type="checkbox" className="accent-primary w-4 h-4 rounded cursor-pointer" />
              Remember me
            </label>
            <a href="#" className="text-primary font-medium hover:text-primary-hover transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="mt-4 bg-primary text-white text-lg px-6 py-3.5 rounded-full font-medium transition-all cursor-pointer shadow-[0_4px_14px_rgba(140,179,140,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(140,179,140,0.4)] disabled:opacity-70">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-text-light mt-8 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-medium hover:text-primary-hover transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
