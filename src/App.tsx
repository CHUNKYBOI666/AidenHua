import { motion, useInView } from "motion/react";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    id: "01",
    title: "Distributed Task Scheduler",
    category: "Systems · Backend",
    year: "2025",
    description:
      "A fault-tolerant task scheduling system built on a custom distributed queue. Handles priority inversion, dead-letter queues, and real-time worker health monitoring across nodes.",
    tech: ["Go", "Redis", "gRPC", "Docker"],
    thumbnail: "https://picsum.photos/seed/scheduler-sys/800/560?grayscale",
    link: "#",
  },
  {
    id: "02",
    title: "Chord — Study Planner",
    category: "Full-Stack · Web",
    year: "2024",
    description:
      "An AI-assisted study planner that generates adaptive schedules from syllabi. Parses PDF course outlines and maps deadlines to a calendar with spaced-repetition suggestions.",
    tech: ["React", "Python", "FastAPI", "PostgreSQL"],
    thumbnail: "https://picsum.photos/seed/chord-planner/800/560?grayscale",
    link: "#",
  },
  {
    id: "03",
    title: "Lens — Photo Portfolio CMS",
    category: "Creative Tool · Web",
    year: "2024",
    description:
      "A minimal content management system built for photographers. Features drag-and-drop curation, EXIF metadata display, and on-the-fly image optimization via Cloudflare Workers.",
    tech: ["Next.js", "TypeScript", "Cloudflare", "Supabase"],
    thumbnail: "https://picsum.photos/seed/lens-cms/800/560?grayscale",
    link: "#",
  },
  {
    id: "04",
    title: "Arbiter — Chess Engine",
    category: "Algorithms · C++",
    year: "2023",
    description:
      "A UCI-compatible chess engine implementing iterative deepening alpha-beta pruning, transposition tables, and a hand-tuned evaluation function reaching ~1800 Elo on CCRL.",
    tech: ["C++", "UCI Protocol", "Bitboards"],
    thumbnail: "https://picsum.photos/seed/arbiter-chess/800/560?grayscale",
    link: "#",
  },
];

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.08 }}
    >
      <div className="group grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 py-8">
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-[2px] aspect-[16/11] bg-[#f5f5f5]">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="object-cover w-full h-full opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between py-1">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-medium tracking-[0.2em] text-[#aaaaaa] uppercase">
                  {project.id}
                </span>
                <h3 className="mt-1 text-[15px] font-bold tracking-tight text-black leading-tight">
                  {project.title}
                </h3>
              </div>
              <a
                href={project.link}
                className="flex-shrink-0 mt-1 text-[#cccccc] hover:text-black transition-colors duration-200"
                aria-label={`View ${project.title}`}
              >
                <ArrowUpRight size={15} />
              </a>
            </div>

            <p className="text-[10px] font-medium tracking-[0.15em] text-[#aaaaaa] uppercase">
              {project.category}&ensp;·&ensp;{project.year}
            </p>

            <p className="text-[12.5px] text-[#555555] leading-relaxed max-w-sm">
              {project.description}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] tracking-wide text-[#888888] border border-[#e8e8e8] px-2 py-0.5 rounded-[2px]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-[#eeeeee]" />
    </motion.div>
  );
}

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-white text-[#1a1a1a] selection:bg-black selection:text-white"
    >
      <div className="max-w-[900px] mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <header className="mb-3 flex items-center justify-between">
          <nav className="text-[11px] font-medium text-[#666666] tracking-tight">
            <span className="hover:text-black cursor-pointer transition-colors">home</span>
            <span className="mx-2">/</span>
          </nav>
          <div className="flex items-center gap-5 text-[#666666]">
            <a href="#" className="hover:text-black transition-colors">
              <Mail size={16} />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <Github size={16} />
            </a>
          </div>
        </header>

        <hr className="border-[#eeeeee] mb-10" />

        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          <div className="space-y-6">
            <h1 className="text-lg font-bold tracking-tight text-black uppercase">
              Aiden Hua
            </h1>

            <a
              href="#"
              className="block text-xs text-[#444444] hover:text-black underline underline-offset-4 decoration-[#eeeeee] hover:decoration-black transition-colors"
            >
              CS | McGill University
            </a>

            <div className="space-y-5 text-[13px] text-[#444444] leading-relaxed max-w-md font-normal">
              <p>
                I'm a student who is passionate about designing and building
                systems that create meaningful impact. I am currently seeking{" "}
                <span className="italic">summer 2026</span> (May–August)
                internships.
              </p>
              <p>
                In my leisure time, I pursue strategic and creative interests
                including chess, drawing, photography, and volleyball. I'm
                committed to continuous learning, collaborative problem-solving,
                and building professional relationships.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-[2px]">
            <img
              src="https://picsum.photos/seed/mountain-hiker/800/800?grayscale"
              alt="Aiden Hua"
              className="object-cover w-full h-full opacity-95 hover:opacity-100 transition-opacity duration-200"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <hr className="border-[#eeeeee] mb-10" />

        {/* Projects Section */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-[10px] font-bold tracking-[0.25em] text-black uppercase opacity-60">
              Projects
            </h2>
            <span className="text-[10px] text-[#aaaaaa] tracking-wide">
              {projects.length} total
            </span>
          </div>
          <p className="text-[11px] text-[#aaaaaa] italic mb-8">
            built end-to-end through code
          </p>

          <hr className="border-[#eeeeee]" />

          <div>
            {projects.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* Other Work */}
        <section className="mb-16">
          <h2 className="text-[10px] font-bold tracking-[0.25em] text-black uppercase mb-6 opacity-60">
            Also
          </h2>
          <div className="space-y-6">
            {[
              { label: "sketches", description: "(coming soon!) drawn in one take with a ball-point pen" },
              { label: "photos", description: "captured from moments noticed" },
            ].map(({ label, description }) => (
              <div key={label}>
                <a
                  href="#"
                  className="inline-block text-base hover:text-black underline underline-offset-4 decoration-[#eeeeee] hover:decoration-black transition-colors mb-0.5"
                >
                  {label}
                </a>
                <p className="text-[#888888] italic text-[11px]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-[#eeeeee] mb-6" />
      </div>
    </motion.div>
  );
}
