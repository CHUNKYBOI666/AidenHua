import { Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Sidebar() {
  return (
    <aside className="w-full md:w-72 flex-shrink-0">
      <div className="relative group">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full aspect-square border border-gray-200 overflow-hidden bg-white mb-4"
        >
          <img 
            src="https://picsum.photos/seed/aiden/400/400" 
            alt="Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute bottom-8 right-2 bg-white border border-gray-200 p-1.5 shadow-sm hidden md:block">
          <span className="text-sm">😊</span>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Aiden Hua</h1>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-400" />
          <span>Montreal, Canada</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-gray-400" />
          <a href="mailto:aidenhua2007@gmail.com" className="hover:text-blue-600">aidenhua2007@gmail.com</a>
        </div>
        <div className="flex items-center gap-2">
          <Github size={16} className="text-gray-400" />
          <a href="https://github.com/CHUNKYBOI666" target="_blank" rel="noreferrer" className="hover:text-blue-600">CHUNKYBOI666</a>
        </div>
        <div className="flex items-center gap-2">
          <Linkedin size={16} className="text-gray-400" />
          <a href="https://www.linkedin.com/in/aiden-hua-660952294" target="_blank" rel="noreferrer" className="hover:text-blue-600">aiden-hua</a>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Achievements</h2>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-yellow-100 flex items-center justify-center text-lg" title="Star Contributor">
            ⭐
          </div>
          <div className="w-8 h-8 bg-blue-100 flex items-center justify-center text-lg" title="Fast Learner">
            🚀
          </div>
        </div>
      </div>
    </aside>
  );
}
