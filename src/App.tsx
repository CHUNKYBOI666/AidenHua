import { Analytics } from "@vercel/analytics/react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Github, ArrowUpRight, X, Eye } from "lucide-react";
import {
  Fragment,
  useRef,
  useState,
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";
import { SnakeCalendar } from "@/components/SnakeCalendar";
import epsteinProjectMedia from "@/assets/RagEpsteinDemo.mp4";
import baconheadThumbnail from "@/assets/baconheadDemo.gif";
import easyFinderThumbnail from "@/assets/EasyFinderPic.jpg";
import profilePhoto from "@/assets/IMG_4586.JPG";

const projects = [
  {
    id: "01",
    title: "RAG for Epstein File",
    category: "Systems · Backend",
    year: "Feb 2026",
    description:
      "RAG for 20k+ document corpus of the Epstein File. Include Q&A with Citations, entity search function, and relationship Graphs between entities. Allows open any cited document to see full DOJ text files.",
    thumbnail: epsteinProjectMedia,
    media: "video" as const,
    link: "https://github.com/CHUNKYBOI666/RAGforEpsteinFiles",
  },
  {
    id: "02",
    title: "Baconhead",
    category: "Full-Stack · Web",
    year: "Mar 2026",
    description:
      "Explores vision model which trains a bot that watches gameplay, learn game states and takes over to play the game. Tests and ran on simple roblox obbies.",
    thumbnail: baconheadThumbnail,
    media: "image" as const,
    link: "https://github.com/ibrahimansr/baconhead",
  },
  {
    id: "03",
    title: "EasyFinder",
    category: "Creative Tool · Web",
    year: "Mar 2026",
    description:
      "Semantic file search for macOS via Raycast. Describe what you're looking for in plain English and EasyFinder returns the most relevant images, PDFs, Office docs, and Markdown files from your machine.",
    thumbnail: easyFinderThumbnail,
    media: "image" as const,
    link: "https://github.com/CHUNKYBOI666/EasyFinder",
  },
];

type Project = (typeof projects)[0];

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function ProjectPreviewOverlay({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-4 py-6 sm:px-6 sm:py-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} preview`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-[min(100%,520px)] sm:w-full sm:max-w-[min(900px,78vw)]"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              className="relative overflow-hidden bg-[#0a0a0a]"
              style={{ aspectRatio: "16/10" }}
            >
              <button
                type="button"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-2 right-2 z-10 p-2 text-white/70 hover:text-white transition-colors duration-200 touch-manipulation"
                aria-label="Close preview"
              >
                <X size={18} strokeWidth={1.25} />
              </button>
              {project.media === "video" ? (
                <video
                  src={project.thumbnail}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              ) : (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <p className="mt-4 text-[14px] font-light tracking-tight text-white/90">
              {project.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.07,
      }}
    >
      <div className="flex flex-col gap-3 py-4 cursor-default sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        {/* Left: title + description */}
        <div className="flex items-start gap-3 min-w-0 sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2 sm:justify-start sm:gap-2.5 flex-wrap">
              <span className="text-[14px] tracking-tight text-black transition-colors duration-150">
                {project.title}
              </span>
              <span className="text-[10.5px] font-medium tracking-[0.15em] text-[#bbbbbb] uppercase shrink-0">
                {project.year}
              </span>
            </div>
            <p className="mt-1 text-[12.5px] text-[#777777] leading-relaxed sm:max-w-md">
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 self-end sm:items-start sm:gap-3 sm:self-auto sm:pt-0.5">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="p-2.5 -m-1 text-[#cccccc] hover:text-black transition-colors duration-200 touch-manipulation"
            aria-label={`Preview ${project.title}`}
          >
            <Eye size={14} strokeWidth={1.5} />
          </button>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 -m-1 text-[#cccccc] hover:text-black transition-colors duration-200 touch-manipulation"
            aria-label={`View ${project.title} on GitHub`}
          >
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      <div className="w-4 border-t border-[#c8c8c8]" />
    </motion.div>
  );
}

/** Profile photo background opacity — 0 (hidden) to 1 (fully visible) */
const BACKGROUND_OPACITY = 0.09;

export default function App() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [nameToggled, setNameToggled] = useState(false);

  const toggleName = useCallback(() => {
    setNameToggled((t) => !t);
  }, []);

  const handleOpenPreview = useCallback((p: Project) => {
    setPreviewProject(p);
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewProject(null);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative isolate min-h-screen text-[#1a1a1a] selection:bg-black selection:text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${profilePhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center 69%",
          backgroundRepeat: "no-repeat",
          opacity: BACKGROUND_OPACITY,
          filter: "grayscale(100%) contrast(110%)",
        }}
      />

      <ProjectPreviewOverlay
        project={previewProject}
        onClose={handleClosePreview}
      />

      <div className="relative z-10 max-w-[900px] mx-auto px-4 py-10 sm:px-6 sm:py-12 md:py-20">
        <header className="mb-3 flex items-center justify-between gap-4">
          <nav className="text-[12px] font-medium text-[#666666] tracking-tight">
            <span className="hover:text-black cursor-pointer transition-colors">
              home
            </span>
            <span className="mx-2">/</span>
          </nav>
          <div className="flex items-center gap-1 text-[#666666] sm:gap-5">
            <a
              href="mailto:aidenhua2007@gmail.com"
              className="p-2 hover:text-black transition-colors touch-manipulation"
              aria-label="Email Aiden Hua"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/aiden-hua-660952294"
              className="p-2 hover:text-black transition-colors touch-manipulation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aiden Hua on LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com/CHUNKYBOI666"
              className="p-2 hover:text-black transition-colors touch-manipulation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aiden Hua on GitHub"
            >
              <Github size={16} />
            </a>
          </div>
        </header>

        <hr className="border-[#e2e2e2] mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-6 sm:gap-8 items-start mb-10 sm:mb-14">
          <div className="space-y-4 sm:space-y-6 max-w-xl">
            <motion.h1
              role={canHover ? undefined : "button"}
              tabIndex={canHover ? undefined : 0}
              aria-label={
                canHover
                  ? undefined
                  : nameToggled
                    ? "Show Aiden Hua"
                    : "Show Chinese name 华一诺"
              }
              className={`relative text-xl sm:text-2xl font-normal tracking-tight text-gray-800 w-fit ${
                canHover
                  ? "cursor-default"
                  : "cursor-pointer touch-manipulation select-none"
              }`}
              initial="initial"
              animate={!canHover && nameToggled ? "hover" : "initial"}
              whileHover={canHover ? "hover" : undefined}
              onClick={canHover ? undefined : toggleName}
              onKeyDown={
                canHover
                  ? undefined
                  : (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleName();
                      }
                    }
              }
            >
              <motion.span
                variants={{
                  initial: { opacity: 1, y: 0, filter: "blur(0px)" },
                  hover: { opacity: 0, y: -8, filter: "blur(4px)" },
                }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="inline-block"
              >
                Aiden Hua
              </motion.span>
              <motion.span
                variants={{
                  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
                  hover: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="absolute left-0 top-0 inline-block text-black"
              >
                华一诺
              </motion.span>
            </motion.h1>
            <div className="space-y-0.5 text-[14px] text-[#666666] leading-relaxed">
              <p>cs @McGill</p>
              <p>Engineering Intern @ Evertz</p>
            </div>
          </div>
          <div className="w-full min-w-0 md:min-w-fit flex justify-start md:justify-end">
            <a
              href="https://github.com/CHUNKYBOI666"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-full md:w-max opacity-80 hover:opacity-100 transition-opacity duration-300"
              aria-label="View GitHub Contributions"
            >
              <SnakeCalendar
                username="CHUNKYBOI666"
                enableSnake={!isMobile}
                fitToWidth={isMobile}
                blockSize={isMobile ? 10 : 10}
                blockMargin={isMobile ? 3 : 4}
                fontSize={isMobile ? 11 : 13}
                showMonthLabels={!isMobile}
                blockRadius={0}
                showTotalCount={false}
                showColorLegend={false}
                theme={{
                  light: [
                    "#eeeeee",
                    "#767676",
                    "#676767",
                    "#4d4d4d",
                    "#1a1a1a",
                  ],
                }}
                transformData={(contributions) =>
                  contributions.filter(
                    (day) => new Date(day.date) >= new Date("2025-11-01"),
                  )
                }
              />
            </a>
          </div>
        </div>

        <section className="mb-16">
          <div className="flex items-center gap-4 mb-0">
            <h2 className="text-[11px] font-bold tracking-[0.25em] text-black uppercase opacity-60 shrink-0">
              Projects
            </h2>
            <div className="flex-1 border-t border-[#e2e2e2]" />
            <span className="text-[11px] text-[#aaaaaa] tracking-wide shrink-0">
              {projects.length} total
            </span>
          </div>
          <div>
            {projects.map((project, i) => (
              <Fragment key={project.id}>
                <ProjectRow
                  project={project}
                  index={i}
                  onOpen={handleOpenPreview}
                />
              </Fragment>
            ))}
          </div>
        </section>

        <hr className="border-[#e2e2e2] mb-6" />
      </div>
      <Analytics />
    </motion.div>
  );
}
