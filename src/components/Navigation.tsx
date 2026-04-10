import { NavLink } from 'react-router-dom';
import { BookOpen, Briefcase, Camera, Layout as LayoutIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navigation() {
  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutIcon },
    { name: 'About', path: '/about', icon: BookOpen },
    { name: 'Experiences', path: '/experiences', icon: Briefcase },
    { name: 'Photos', path: '/photos', icon: Camera },
  ];

  return (
    <nav className="border-b border-gray-200 mb-6 sticky top-0 bg-white z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "border-orange-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
