import { motion } from 'motion/react';
import { EXPERIENCES } from '../constants';

export default function Experiences() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
      
      {EXPERIENCES.map((exp) => (
        <div key={exp.id} className="border border-gray-200 rounded-lg p-6 bg-white flex gap-6">
          <div className="w-12 h-12 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center text-xl">
            🏢
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
              <span className="text-sm text-gray-500">{exp.period}</span>
            </div>
            <p className="text-base font-medium text-blue-600 mb-4">{exp.company}</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
