export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  stars?: number;
  language: string;
  languageColor: string;
  content: string;
}

export interface Activity {
  id: string;
  date: string;
  type: 'commit' | 'repo' | 'event';
  title: string;
  details?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  logo?: string;
}
