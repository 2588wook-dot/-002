import { useState, useEffect } from "react";
import { Project } from "./types";
import { INITIAL_PROJECTS } from "./data";
import ProjectGrid from "./components/ProjectGrid";
import ProjectDetail from "./components/ProjectDetail";
import AdminPanel from "./components/AdminPanel";
import AdminPasswordModal from "./components/AdminPasswordModal";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  // Navigation states
  const [view, setView] = useState<"grid" | "detail" | "admin">("grid");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Initialize projects list from localStorage, default to 30 custom mock projects in data.ts
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("ourwork_portfolio_projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (err) {
        console.error("Error reading portfolio projects from localStorage", err);
      }
    }
    return INITIAL_PROJECTS;
  });

  // Ensure that the database / localStorage always has a copy of either initial or edited data, and password defaults
  useEffect(() => {
    if (!localStorage.getItem("ourwork_portfolio_projects")) {
      localStorage.setItem("ourwork_portfolio_projects", JSON.stringify(projects));
    }
    if (!localStorage.getItem("ourwork_admin_password")) {
      localStorage.setItem("ourwork_admin_password", "7777");
    }
  }, [projects]);

  // Save projects change to state and localStorage
  const handleSaveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("ourwork_portfolio_projects", JSON.stringify(updatedProjects));
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    setView("detail");
  };

  const handleBackToGallery = () => {
    setView("grid");
    setSelectedProjectId(null);
  };

  const handleOpenAdmin = () => {
    setIsPasswordModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsPasswordModalOpen(false);
    setView("admin");
  };

  const currentProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-neutral-900 selection:bg-neutral-200 antialiased overflow-x-hidden font-sans">
      <AnimatePresence mode="wait">
        {view === "grid" && (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProjectGrid
              projects={projects}
              onSelectProject={handleSelectProject}
              onOpenAdmin={handleOpenAdmin}
            />
          </motion.div>
        )}

        {view === "detail" && currentProject && (
          <motion.div
            key="detail-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProjectDetail
              project={currentProject}
              onBack={handleBackToGallery}
            />
          </motion.div>
        )}

        {view === "admin" && (
          <motion.div
            key="admin-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AdminPanel
              projects={projects}
              onSaveProjects={handleSaveProjects}
              onBack={handleBackToGallery}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AdminPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
