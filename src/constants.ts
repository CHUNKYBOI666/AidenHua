import { Project, Activity, Experience } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'baconhead',
    title: 'baconhead',
    description: 'Beat Roblox with this advanced automation tool.',
    thumbnail: 'https://picsum.photos/seed/bacon/400/200',
    tags: ['Python', 'Automation'],
    stars: 53,
    language: 'Python',
    languageColor: '#3572A5',
    content: 'Detailed description of baconhead project...'
  },
  {
    id: 'rag-epstein',
    title: 'RAGforEpsteinFiles',
    description: 'Retrieval Augmented Generation for legal documents.',
    thumbnail: 'https://picsum.photos/seed/rag/400/200',
    tags: ['Python', 'AI', 'RAG'],
    stars: 19,
    language: 'Python',
    languageColor: '#3572A5',
    content: 'Detailed description of RAG project...'
  },
  {
    id: 'comic-gen',
    title: 'ComicGenAndAudioBookGen',
    description: 'Generate comics and audiobooks from text prompts.',
    thumbnail: 'https://picsum.photos/seed/comic/400/200',
    tags: ['Python', 'GenAI'],
    stars: 1,
    language: 'Python',
    languageColor: '#3572A5',
    content: 'Detailed description of ComicGen project...'
  },
  {
    id: 'rsa-encryption',
    title: 'RSA-Encryption',
    description: 'Pure Python implementation of RSA algorithm.',
    thumbnail: 'https://picsum.photos/seed/rsa/400/200',
    tags: ['Python', 'Security'],
    stars: 1,
    language: 'Python',
    languageColor: '#3572A5',
    content: 'Detailed description of RSA project...'
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    date: 'April 2026',
    type: 'commit',
    title: 'Created 36 commits in 2 repositories',
    details: ['CHUNKYBOI666/CBC-hackathon (35 commits)', 'CHUNKYBOI666/RAGforEpsteinFiles (1 commit)']
  },
  {
    id: '2',
    date: 'April 2026',
    type: 'repo',
    title: 'Created 1 repository',
    details: ['CHUNKYBOI666/CBC-hackathon']
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    company: 'Tech Innovators',
    role: 'Software Engineer Intern',
    period: 'June 2025 - August 2025',
    description: [
      'Developed full-stack features using React and Node.js.',
      'Optimized database queries for better performance.',
      'Collaborated with cross-functional teams.'
    ]
  },
  {
    id: 'exp2',
    company: 'Open Source Community',
    role: 'Contributor',
    period: '2024 - Present',
    description: [
      'Contributed to various Python and TypeScript projects.',
      'Fixed bugs and implemented new features.',
      'Participated in code reviews.'
    ]
  }
];
