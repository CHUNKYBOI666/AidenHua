import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { ArrowLeft, Star, GitFork, ExternalLink, Github } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Return home</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <Link 
        to="/" 
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to overview
      </Link>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-64 object-cover border-b border-gray-200"
          referrerPolicy="no-referrer"
        />
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <Github size={20} className="text-gray-700" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                <ExternalLink size={16} />
                Live Demo
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 py-4 border-y border-gray-100 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: project.languageColor }} />
              <span className="font-medium text-gray-900">{project.language}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={16} />
              <span className="font-medium text-gray-900">{project.stars}</span> stars
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork size={16} />
              <span className="font-medium text-gray-900">12</span> forks
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {project.description}
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Overview</h3>
            <p className="text-gray-600 mb-4">
              {project.content}
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
