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
      className="overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
    >
      <Link to={`/project/${project.id}`} className="block">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-40 object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="px-4 py-3">
          <p className="text-sm font-medium text-gray-900">{project.title}</p>
        </div>
      </Link>
    </motion.div>
  );
}
