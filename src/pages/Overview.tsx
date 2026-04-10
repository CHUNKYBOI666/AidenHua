import ProjectCard from '../components/ProjectCard';
import ContributionGraph from '../components/ContributionGraph';
import RecentActivity from '../components/RecentActivity';
import { PROJECTS } from '../constants';
import { motion } from 'motion/react';

export default function Overview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-medium text-gray-900">Projects</h2>
          <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
            Customize your pins
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <ContributionGraph />
      </section>

      <section>
        <RecentActivity />
      </section>
    </motion.div>
  );
}
