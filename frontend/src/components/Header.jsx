import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  
  // Don't show header on admin pages
  if (location.pathname.startsWith('/admin')) return null;
  
  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('gallery'), path: '/gallery' },
    { name: t('contact'), path: '/contact' },
    { name: language === 'id' ? 'LOGIN' : 'LOGIN', path: '/admin/login' }
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-98 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
            <img
              src="https://customer-assets.emergentagent.com/job_bespoke-couture/artifacts/dbc27iph_Shandora%20Tailor%20Logo%20new.png"
              alt="Sandhora Tailor"
              className="h-12 md:h-14 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-sans text-sm tracking-widest uppercase transition-colors duration-300 relative ${
                  location.pathname === item.path
                    ? 'text-black font-medium'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                    layoutId="underline"
                  />
                )}
              </Link>
            ))}
            
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded font-sans text-sm tracking-wider"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'ID' : 'EN'}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black hover:text-gray-600 transition-colors duration-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${
                      location.pathname === item.path
                        ? 'text-black font-medium'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Language Toggle */}
                <button
                  onClick={() => {
                    toggleLanguage();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded font-sans text-sm tracking-wider"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'en' ? 'Bahasa Indonesia' : 'English'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
