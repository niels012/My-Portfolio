import React from 'react';
import { Linkedin, ArrowUp } from 'lucide-react';
import { personalInfo, navLinks } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Copyright */}
          <div>
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="text-2xl font-bold text-white hover:text-teal-400 transition-colors duration-300"
            >
              {personalInfo.name.split(' ')[0]}
              <span className="text-teal-400">.</span>
            </a>
            <p className="text-zinc-500 text-sm mt-2">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-zinc-400 hover:text-white transition-colors duration-300 text-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social & Back to Top */}
          <div className="flex items-center justify-end gap-4">
            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:bg-teal-500 hover:text-zinc-950 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:bg-teal-500 hover:text-zinc-950 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
