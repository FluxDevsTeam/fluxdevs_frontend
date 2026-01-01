import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavbar } from './Context';

// Simplified nav: only main pages
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { isNavbarVisible, setIsNavbarVisible } = useNavbar();
  const lastScrollY = useRef(window.scrollY);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsNavbarVisible]);

  const isOpaque = hovered || scrolled;
  const navBg = isOpaque ? 'bg-white shadow-md border-b border-gray-100' : 'bg-transparent';
  const navTransition = 'transition-all duration-300 ease-in-out';
  const navPosition = 'fixed left-0 top-0 w-full';
  const navTransform = isNavbarVisible ? 'translate-y-0' : '-translate-y-full';
  const textColor = isOpaque ? 'text-[#1a1a1a]' : 'text-white';
  
  const headerBg = navBg;

  return (
    <header
      className={`${navPosition} ${navTransform} z-50 ${headerBg} ${navTransition}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ fontFamily: 'Euclid Circular A, Inter, Arial, sans-serif' }}
    >
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between py-0 px-0 h-[72px] ${textColor}`}
        style={{ height: '72px' }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 h-full flex-shrink-0">
          <img
            src="/public/images/Component 5.png"
            alt="Fluxdevs Logo"
            className={`h-6 w-auto ${!isOpaque ? 'brightness-0 invert' : ''}`}
          />
          <span className={`uppercase tracking-[0.14em] font-bold text-[14px] ${textColor}`}>FLUXDEVS</span>
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-4 md:gap-5 lg:gap-6 items-center h-full ">
          {navItems.map((item) => (
            <li key={item.to} className="relative flex items-center h-full">
              <Link
                to={item.to}
                className={`px-6 py-2 uppercase tracking-[0.14em] font-bold text-[14px] ${textColor} hover:text-[#2176ff] transition border-b-2 border-transparent hover:border-[#2176ff] h-full flex items-center gap-1`}
                style={{ fontFamily: 'Euclid Circular A, Inter, Arial, sans-serif', letterSpacing: '0.14em', height: '72px', display: 'flex', alignItems: 'center' }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-block font-bold text-[13px] uppercase tracking-[0.14em] px-3 py-2 bg-[#2176ff] text-white rounded shadow hover:bg-[#0056d6] transition"
          style={{ letterSpacing: '0.14em', fontFamily: 'Euclid Circular A, Inter, Arial, sans-serif' }}
        >
          CONTACT US
        </Link>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block px-6 py-3 text-[#1a1a1a] hover:text-[#2176ff] hover:bg-[#f7fafd]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;