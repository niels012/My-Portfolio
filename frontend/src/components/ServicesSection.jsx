import React from 'react';
import { Palette, Code } from 'lucide-react';
import { services } from '../data/mock';

const iconMap = {
  Palette: Palette,
  Code: Code
};

const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Palette;
  
  return (
    <div className="group p-8 bg-zinc-800/50 rounded-2xl border border-zinc-700/50 hover:border-teal-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5">
      <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors duration-300">
        <IconComponent className="w-7 h-7 text-teal-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4">
        {service.title}
      </h3>
      
      <p className="text-zinc-400 leading-relaxed">
        {service.description}
      </p>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-teal-400 text-sm font-medium uppercase tracking-wider">
            Services
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2">
            What I Do
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            I specialize in creating stunning websites that help businesses grow and succeed online.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
