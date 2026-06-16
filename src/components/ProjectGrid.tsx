import { Project } from "../types";
import { motion } from "motion/react";

interface ProjectGridProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
  onOpenAdmin: () => void;
}

export default function ProjectGrid({
  projects,
  onSelectProject,
  onOpenAdmin,
}: ProjectGridProps) {
  // Sort projects by order ascending
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-[#F9F9F7] px-6 py-8 md:px-12 md:py-12 flex flex-col justify-between relative selection:bg-neutral-200">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Header fitted perfectly to theme style */}
        <header className="mb-12 md:mb-16 flex items-center justify-between border-b border-[#E5E5E2] pb-6">
          <div className="flex flex-col">
            <h1 className="text-[18px] font-semibold tracking-[0.25em] uppercase text-neutral-900 opacity-80">
              OUR WORK
            </h1>
          </div>
          
          <nav className="flex items-center gap-4 md:gap-6 text-[10px] tracking-widest uppercase text-neutral-500">
            <button
              onClick={onOpenAdmin}
              className="font-semibold text-neutral-800 hover:text-black hover:underline underline-offset-4 cursor-pointer transition-all tracking-widest uppercase text-[10px]"
              id="header-admin-button"
            >
              관리자
            </button>
          </nav>
        </header>

        {/* Portfolio Grid */}
        {sortedProjects.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center">
            <p className="text-sm font-light text-neutral-400 tracking-wide">
              등록된 프로젝트가 없습니다.
            </p>
            <button
              onClick={onOpenAdmin}
              className="mt-4 text-xs font-display uppercase tracking-widest px-4 py-2 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-900 transition-colors duration-300"
            >
              첫 번째 프로젝트 추가하기
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
                onClick={() => onSelectProject(project.id)}
                className="group cursor-pointer flex flex-col"
                id={`project-card-${project.id}`}
              >
                {/* Image Wrapper aspect ratio adjusted to fit mock bento feel, preserving responsiveness */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE8E4] border border-[#E5E5E2]/50">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-104 filter brightness-[0.98] group-hover:brightness-100"
                    loading="lazy"
                  />
                  {/* Subtle hover shading overlay */}
                  <div className="absolute inset-0 bg-black/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info block with exact text sizes matched from bento theme */}
                <div className="mt-3 flex flex-col">
                  <p className="text-[12px] font-medium text-[#1A1A1A] tracking-normal leading-tight group-hover:opacity-85 transition-opacity">
                    {project.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Footer styled beautifully with thin elegant borders */}
      <footer className="mt-24 max-w-7xl mx-auto w-full pt-8 border-t border-[#E5E5E2] flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-neutral-400 font-sans tracking-wide">
        <div>
          <span>© OUR WORK. All Rights Reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={onOpenAdmin}
            className="text-[9px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1 group"
            id="admin-trigger-button"
          >
            <span className="w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            관리자
          </button>
        </div>
      </footer>
    </div>
  );
}
