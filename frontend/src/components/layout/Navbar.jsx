import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/our-work', label: 'Our Work' },
  { path: '/projects', label: 'Projects' },
  { path: '/media', label: 'Media' },
  { path: '/get-involved', label: 'Get Involved' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-ivory/95 backdrop-blur-sm shadow-sm border-b border-sage/20' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container-page mx-auto px-4 md:px-6" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-heading text-2xl font-bold text-indigo hover:opacity-80 transition-opacity"
            aria-label="S.P.R.I.N.T. Home"
          >
            <svg className="w-8 h-8 text-madder" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16 2L4 8v16l12 6 12-6V8L16 2zm0 2.5L25.5 9 16 14.5 6.5 9 16 4.5zM6 10.5l9 4.5v11l-9-4.5V10.5zm11 15.5v-11l9-4.5v11l-9 4.5z"/>
            </svg>
            <span className="hidden sm:block">S.P.R.I.N.T.</span>
          </Link>

          <div className={`hidden md:flex items-center gap-1 ${isScrolled ? 'text-ink' : 'text-ivory'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-sage/20 ${
                  location.pathname === link.path 
                    ? 'bg-indigo text-ivory shadow-md' 
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/donate" className="hidden sm:block">
              <Button variant="primary" size="sm">Donate Now</Button>
            </Link>
            
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-ink hover:bg-gray-100' : 'text-ivory hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div 
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-sage/20">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'bg-indigo text-ivory' 
                    : 'text-ink hover:bg-sage/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/donate" className="mt-2">
              <Button variant="primary" className="w-full">Donate Now</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;