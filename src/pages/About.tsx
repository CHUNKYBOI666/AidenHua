import { motion } from 'motion/react';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="prose prose-sm max-w-none text-gray-700"
    >
      <div className="border border-gray-200 p-8 bg-white">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">About Me</h2>
        
        <div className="space-y-4">
          <p>
            Hi, I'm Aiden! I'm a software engineer passionate about building tools that make life easier. 
            I specialize in Python automation, AI/ML, and full-stack web development.
          </p>
          
          <p>
            Currently, I'm exploring the intersection of Generative AI and daily productivity. 
            I love open-source and contribute to various projects in my free time.
          </p>

          <h3 className="text-lg font-medium text-gray-900 mt-8">Technical Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Python', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'PyTorch'].map(skill => (
              <span key={skill} className="px-3 py-1 bg-gray-100 border border-gray-200 text-xs font-medium text-gray-700">
                {skill}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-medium text-gray-900 mt-8">Interests</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Robotics and Automation</li>
            <li>Cybersecurity and Cryptography</li>
            <li>Digital Art and Creative Coding</li>
            <li>Hiking and Photography</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
