import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/mock';

const ProjectCard = ({ project, index }) => {
  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image */}
      <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="group relative overflow-hidden rounded-2xl bg-zinc-800">
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
            <a
              href={project.link}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-zinc-950 font-semibold text-sm rounded-full hover:bg-teal-400 transition-all duration-300"
            >
              View Project
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <span className="text-teal-400 text-sm font-medium uppercase tracking-wider">
          {project.category}
        </span>
        
        <h3 className="text-3xl lg:text-4xl font-bold text-white mt-2 mb-4">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-medium rounded-full border border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-zinc-400 leading-relaxed mb-6">
          {project.description}
        </p>
        
        <a
          href={project.link}
          className="inline-flex items-center gap-2 text-teal-400 font-semibold hover:text-teal-300 transition-colors duration-300 group"
        >
          See this project
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="portfolio" className="py-24 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-teal-400 text-sm font-medium uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2">
            Featured Projects
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects. Each project is a unique piece of development.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
