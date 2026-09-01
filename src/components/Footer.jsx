import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-text-dark py-8 md:py-12 px-6 md:px-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4 max-w-sm w-full md:w-auto">
          <div className="flex items-center gap-3">
            <img 
              src="https://dynamicbusiness.co.uk/wp-content/uploads/2024/10/Dynamic-Brand-Mark-Full-colour.svg" 
              alt="Dynamic Logo" 
              className="h-8 md:h-10 object-contain"
            />
            <span className="font-serif text-xl md:text-2xl font-bold text-white tracking-wide">Dynamic</span>
          </div>
          <p className="text-white/80 text-xs md:text-sm leading-relaxed">
            Empowering individuals to understand, manage, and transform their mental well-being through intelligent, personalized journeys.
          </p>
        </div>

        {/* Links Grid for Mobile Compactness */}
        <div className="grid grid-cols-2 md:flex gap-8 md:gap-12 w-full md:w-auto">
          {/* Links Section */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white text-xs md:text-sm uppercase tracking-wider">Resources</h4>
            <Link to="/" className="text-white/80 hover:text-white transition-colors text-xs md:text-sm">Home</Link>
            <Link to="/phase" className="text-white/80 hover:text-white transition-colors text-xs md:text-sm">Assessment</Link>
            <Link to="/login" className="text-white/80 hover:text-white transition-colors text-xs md:text-sm">Dashboard</Link>
            <Link to="#" className="text-white/80 hover:text-white transition-colors text-xs md:text-sm">Key Facts</Link>
          </div>

          {/* Legal & Support */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white text-xs md:text-sm uppercase tracking-wider">Legal</h4>
            <a href="#" className="text-white/80 hover:text-white transition-colors text-xs md:text-sm">Privacy Policy</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors text-xs md:text-sm">Terms of Service</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors text-xs md:text-sm">Cookie Policy</a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <h4 className="font-bold text-white text-xs md:text-sm uppercase tracking-wider">Contact Us</h4>
          {/* <p className="text-white/80 text-xs md:text-sm">vey</p> */}
          <a href="https://www.dynamicbusiness.co.uk" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors text-xs md:text-sm font-medium">
            www.dynamicbusiness.co.uk
          </a>
          <a href="mailto:john.graham@dynamicbusiness.co.uk" className="text-white/80 hover:text-white transition-colors text-xs md:text-sm">
            john.graham@dynamicbusiness.co.uk
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/60 text-xs">
          © {new Date().getFullYear()} Dynamic Business. All rights reserved.
        </p>
        <p className="text-white/60 text-xs text-center md:text-right max-w-lg">
          Disclaimer: This application provides psychoeducational resources and is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </div>
    </footer>
  );
}
