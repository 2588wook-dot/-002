import { Project } from "../types";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  // Scroll to top when opening detailed page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.id]);

  return (
    <div className="min-h-screen bg-[#F9F9F7] px-6 py-8 md:px-12 md:py-12 selection:bg-neutral-200">
      <div className="max-w-4xl mx-auto w-full">
        {/* Top Minimal Navigation mapped directly from visual theme code */}
        <header className="mb-12 md:mb-16 flex items-center justify-between border-b border-[#E5E5E2] pb-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
            id="detail-back-button"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>뒤로가기</span>
          </button>
          
          <div className="flex-1 text-center">
            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-70">
              {project.title}
            </h2>
          </div>
          <div className="w-12 hidden sm:block"></div>
        </header>

        {/* Project Header section with premium modern serif / serif-italic look */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-left"
        >
          {/* Elegant dialog italic statement / main title */}
          <h3 className="font-serif italic text-2xl md:text-3xl mb-4 text-[#333] leading-snug">
            {project.title}
          </h3>
          
          {/* Main Description details block */}
          <p className="text-sm font-sans text-neutral-600 leading-relaxed font-light max-w-xl whitespace-pre-line">
            {project.description}
          </p>
        </motion.div>

        {/* Detailed Vertical Images */}
        <div className="space-y-8 md:space-y-12">
          {project.detailImages && project.detailImages.length > 0 ? (
            project.detailImages.map((image, idx) => (
              <motion.div
                key={`${project.id}-detail-${idx}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-full overflow-hidden bg-[#EAE8E4] border border-[#E5E5E2]/40"
              >
                <img
                  src={image}
                  alt={`${project.title} - detail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[85vh] filter brightness-[0.98]"
                  loading="lazy"
                />
              </motion.div>
            ))
          ) : (
            // Fallback to cover image if details are empty
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full overflow-hidden bg-[#EAE8E4] border border-[#E5E5E2]/40"
            >
              <img
                src={project.coverImage}
                alt={`${project.title} - cover`}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover max-h-[80vh] filter brightness-[0.98]"
              />
            </motion.div>
          )}
        </div>

        {/* Secondary Back Navigation footer */}
        <div className="mt-16 md:mt-24 pt-12 border-t border-[#E5E5E2] flex justify-center pb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-[10px] font-display tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors duration-300 py-3 px-6 border border-[#E5E5E2] hover:border-neutral-900 bg-white"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>포트폴리오 목록으로 돌아가기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
