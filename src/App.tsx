/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import Overview from './pages/Overview';
import About from './pages/About';
import Experiences from './pages/Experiences';
import Photos from './pages/Photos';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">
        {/* Header Spacer (GitHub-like top bar placeholder) */}
        <header className="h-16 bg-[#010409] w-full flex items-center px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
              <span className="text-white text-lg font-bold">A</span>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 text-sm text-white/50 w-64">
              <span>Type / to search</span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-grow min-w-0">
              <Navigation />
              
              <div className="mt-4">
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/experiences" element={<Experiences />} />
                  <Route path="/photos" element={<Photos />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                </Routes>
              </div>
            </div>
          </div>
        </main>

        <footer className="max-w-7xl mx-auto px-4 py-10 mt-20 border-t border-gray-200 text-xs text-gray-500 flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-start">
          <span>© 2026 Aiden Hua</span>
          <a href="#" className="hover:text-blue-600 hover:underline">Terms</a>
          <a href="#" className="hover:text-blue-600 hover:underline">Privacy</a>
          <a href="#" className="hover:text-blue-600 hover:underline">Security</a>
          <a href="#" className="hover:text-blue-600 hover:underline">Status</a>
          <a href="#" className="hover:text-blue-600 hover:underline">Docs</a>
          <a href="#" className="hover:text-blue-600 hover:underline">Contact</a>
        </footer>
      </div>
    </Router>
  );
}

