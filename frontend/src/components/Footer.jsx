import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { contactInfo } from '../mock';

const Footer = () => {
  const location = useLocation();
  
  // Don't show footer on admin pages
  if (location.pathname.startsWith('/admin')) return null;
  
  return (
    <footer className="bg-charcoal text-cream-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-3xl mb-4">Sandhora Tailor</h3>
            <p className="font-sans text-soft-gray leading-relaxed mb-6">
              Crafting timeless elegance through bespoke tailoring. Where tradition meets contemporary luxury.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-warm-sage bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-warm-sage" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-warm-sage bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-300"
              >
                <Facebook className="w-5 h-5 text-warm-sage" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-medium text-lg mb-6 tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-sans text-soft-gray hover:text-warm-sage transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="font-sans text-soft-gray hover:text-warm-sage transition-colors duration-300"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-sans text-soft-gray hover:text-warm-sage transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-sans font-medium text-lg mb-6 tracking-wide uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-warm-sage flex-shrink-0 mt-0.5" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="font-sans text-soft-gray hover:text-warm-sage transition-colors duration-300"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-warm-sage flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-sans text-soft-gray hover:text-warm-sage transition-colors duration-300"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-warm-sage flex-shrink-0 mt-0.5" />
                <span className="font-sans text-soft-gray leading-relaxed">
                  Canggu, Bali, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-warm-gray border-opacity-30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-sans text-sm text-soft-gray">
              © 2025 Sandhora Tailor. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/admin/login"
                className="font-sans text-xs text-soft-gray hover:text-warm-sage transition-colors duration-300 tracking-wide uppercase"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;