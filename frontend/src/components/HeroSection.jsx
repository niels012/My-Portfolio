import React from 'react';
import { ArrowDown } from 'lucide-react';
import { personalInfo } from '../data/mock';

const HeroSection = () => {
  const scrollToPortfolio = (e) => {
    e.preventDefault();
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-teal-400 text-lg mb-4 font-medium tracking-wide">
              {personalInfo.tagline}
            </p>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block">Web Designer</span>
              <span className="block text-zinc-400">and</span>
              <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Webflow Developer
              </span>
            </h1>
            
            <p className="text-zinc-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {personalInfo.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#portfolio"
                onClick={scrollToPortfolio}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-zinc-950 font-semibold rounded-full hover:bg-teal-400 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5"
              >
                See My Work
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-zinc-700 text-white font-semibold rounded-full hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border border-teal-500/20 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-teal-500/10" />
              
              {/* Photo container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl shadow-teal-500/10">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-2 -right-2 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 shadow-xl">
                <p className="text-xs text-zinc-400">Available for</p>
                <p className="text-sm font-semibold text-teal-400">Freelance Work</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-zinc-500">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
