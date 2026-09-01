import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const textColorClass = isHome ? 'text-white' : 'text-text-dark';
  
  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/users/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      // Reload to clear auth state
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const renderAssessmentButton = (mobile) => (
    <Link 
      to="/phase"
      onClick={() => setIsMenuOpen(false)}
      className={`text-black font-medium px-5 py-2 rounded-full transition-all hover:bg-black/10 flex items-center justify-center gap-2 ${mobile ? 'w-full mt-2 py-3' : 'text-sm'}`}
    >
      Know your mental health
    </Link>
  );

  return (
    <div className="sticky top-4 md:top-6 z-50 mb-8 mt-2 md:mt-4">
      {/* Subtle Sage Tint Glass Navbar */}
      <header className={`flex justify-between items-center py-3 px-5 md:px-8 ${isHome ? 'bg-white/10 border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-primary/10 border-primary/20 shadow-[0_4px_30px_rgba(140,179,140,0.15)]'} backdrop-blur-xl border rounded-2xl md:rounded-full transition-all`}>
        
        {/* Logo */}
        <Link to="/" onClick={() => setIsMenuOpen(false)} className={`font-serif text-2xl md:text-3xl font-semibold text-black tracking-tight hover:opacity-80 transition-opacity`}>
          MindFul
        </Link>
        
        {/* Mobile Hamburger */}
        <button 
          className={`md:hidden p-2 ${textColorClass} rounded-full hover:bg-primary/10 transition-colors`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             {isMenuOpen ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
             )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 items-center">
          
          {/* User Controls */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${isHome ? 'bg-white/20' : 'bg-white/40'} px-4 py-2 rounded-full border border-primary/10 shadow-sm`}>
                <span className="bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
                <span className={`${textColorClass} font-medium text-sm`}>{user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className={`${textColorClass} px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary/10 hover:shadow-sm`}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link 
                to="/login"
                className={`text-black px-5 py-2 rounded-full font-medium transition-all hover:bg-black/10 text-sm`}
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className={`text-black px-5 py-2 rounded-full font-medium  transition-all hover:bg-black/10 text-sm`}
              >
                Sign up
              </Link>
            </div>
          )}
          
          {/* Divider & Assessment Button on Far Right */}
          <div className={`h-6 w-px ${isHome ? 'bg-white/20' : 'bg-text-dark/20'} mx-2`}></div>
          {renderAssessmentButton(false)}
          
        </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-3 bg-white/70 backdrop-blur-md border border-primary/10 rounded-2xl p-5 shadow-lg flex flex-col gap-4 animate-in slide-in-from-top-2">
           {user ? (
             <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-xl border border-primary/5">
                  <span className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs text-text-light uppercase tracking-wider">Logged in as</span>
                    <span className="text-text-dark font-bold">{user.name}</span>
                  </div>
               </div>
               <button 
                  onClick={handleLogout}
                  className="w-full text-center text-text-dark py-3 rounded-xl font-medium bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  Logout
                </button>
             </div>
           ) : (
             <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center text-text-dark py-3 rounded-xl font-medium bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-white/80 text-text-dark py-3 rounded-xl font-medium border border-white transition-colors hover:bg-white">
                  Sign up
                </Link>
             </div>
           )}
           
           <div className="w-full h-px bg-primary/10 my-2"></div>
           {renderAssessmentButton(true)}
        </div>
      )}
    </div>
  );
}
