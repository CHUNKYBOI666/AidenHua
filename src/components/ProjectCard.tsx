import { Star, GitFork } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  key?: string;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="border border-gray-200 rounded-lg p-4 flex flex-col bg-white hover:shadow-sm transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <Link 
          to={`/project/${project.id}`}
          className="text-blue-600 font-semibold hover:underline flex items-center gap-2"
        >
          <span className="text-gray-400">📁</span>
          {project.title}
        </Link>
        <span className="text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-2 py-0.5">
          Public
        </span>
      </div>
      
      <div className="mb-4 flex-grow">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-32 object-cover rounded-md mb-3 border border-gray-100"
          referrerPolicy="no-referrer"
        />
        <p className="text-sm text-gray-600 line-clamp-2">
          {project.description}
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: project.languageColor }}
          />
          {project.language}
        </div>
        {project.stars !== undefined && (
          <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
            <Star size={14} />
            {project.stars}
          </div>
        )}
        <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
          <GitFork size={14} />
          {Math.floor(Math.random() * 10)}
        </div>
      </div>
    </motion.div>
  );
}
