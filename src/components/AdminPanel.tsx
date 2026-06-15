import React, { useState, useRef, useEffect } from "react";
import { Project } from "../types";
import { compressImage } from "../utils/imageCompressor";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Upload,
  Save,
  X,
  GripVertical
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminPanelProps {
  projects: Project[];
  onSaveProjects: (newProjects: Project[]) => void;
  onBack: () => void;
}

export default function AdminPanel({
  projects,
  onSaveProjects,
  onBack,
}: AdminPanelProps) {
  // Local working copy of projects
  const [tempProjects, setTempProjects] = useState<Project[]>([]);
  
  // States
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states during add/edit
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formDetailImages, setFormDetailImages] = useState<string[]>([]);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [formErrors, setFormErrors] = useState<string | null>(null);

  // Password change states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      setPasswordStatus({ type: "error", message: "비밀번호를 입력해 주세요." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: "error", message: "입력한 두 비밀번호가 일치하지 않습니다." });
      return;
    }
    
    localStorage.setItem("ourwork_admin_password", newPassword);
    setPasswordStatus({ type: "success", message: "관리자 비밀번호가 성공적으로 변경되었습니다." });
    setNewPassword("");
    setConfirmPassword("");
    
    setTimeout(() => {
      setPasswordStatus(null);
    }, 3000);
  };

  // File input refs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const detailsInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop (Dnd) State for projects
  const [draggedProjectIndex, setDraggedProjectIndex] = useState<number | null>(null);
  // Drag and Drop (Dnd) State for detailed images
  const [draggedImgIndex, setDraggedImgIndex] = useState<number | null>(null);

  // Initialize
  useEffect(() => {
    // Sort projects according to current order
    const sorted = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0));
    setTempProjects(sorted);
  }, [projects]);

  // Sync back on changes
  const handleSaveToSettings = (updated: Project[]) => {
    // Re-index orders based on current index positions to maintain clean sequence
    const cleanProjects = updated.map((p, idx) => ({
      ...p,
      order: idx + 1,
    }));
    setTempProjects(cleanProjects);
    onSaveProjects(cleanProjects);
  };

  // Up & Down manual arrow controls for projects (mobile friendly guaranteed)
  const handleMoveProject = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === tempProjects.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const reordered = [...tempProjects];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    handleSaveToSettings(reordered);
  };

  // Drag & drop handlers for project items
  const handleProjDragStart = (idx: number) => {
    setDraggedProjectIndex(idx);
  };

  const handleProjDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedProjectIndex === null || draggedProjectIndex === idx) return;

    const reordered = [...tempProjects];
    const item = reordered[draggedProjectIndex];
    reordered.splice(draggedProjectIndex, 1);
    reordered.splice(idx, 0, item);

    setTempProjects(reordered);
    setDraggedProjectIndex(idx);
  };

  const handleProjDragEnd = () => {
    setDraggedProjectIndex(null);
    handleSaveToSettings(tempProjects);
  };

  // Open Form to add new project
  const handleInitCreate = () => {
    setFormTitle("");
    setFormDescription("");
    setFormCoverImage("");
    setFormDetailImages([]);
    setFormErrors(null);
    setIsCreatingNew(true);
    setEditingProject(null);
  };

  // Open Form to edit project
  const handleInitEdit = (project: Project) => {
    setEditingProject(project);
    setFormTitle(project.title);
    setFormDescription(project.description);
    setFormCoverImage(project.coverImage);
    setFormDetailImages(project.detailImages || []);
    setFormErrors(null);
    setIsCreatingNew(false);
  };

  // Delete Project trigger
  const handleDeleteProject = (id: string) => {
    const updated = tempProjects.filter((p) => p.id !== id);
    handleSaveToSettings(updated);
    setDeleteConfirmId(null);
  };

  // Upload Cover handle
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessingImage(true);
    setFormErrors(null);
    try {
      // Compress to max width 640px for ideal cover optimization
      const base64 = await compressImage(files[0], 640, 640, 0.75);
      setFormCoverImage(base64);
    } catch (err: any) {
      setFormErrors("대표 커버 이미지 압축 중 오류가 발생했습니다: " + err.message);
    } finally {
      setIsProcessingImage(false);
    }
  };

  // Upload Detail Images (multiple) handle
  const handleDetailsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessingImage(true);
    setFormErrors(null);
    try {
      const results: string[] = [...formDetailImages];
      for (let i = 0; i < files.length; i++) {
        // Compress detail images to max width 1000px for sharp but light display
        const base64 = await compressImage(files[i], 1000, 1000, 0.75);
        results.push(base64);
      }
      setFormDetailImages(results);
    } catch (err: any) {
      setFormErrors("상세 이미지 압축 중 오류가 발생했습니다: " + err.message);
    } finally {
      setIsProcessingImage(false);
      if (detailsInputRef.current) {
        detailsInputRef.current.value = "";
      }
    }
  };

  // Remove detail image during edit form
  const handleRemoveDetailImage = (index: number) => {
    setFormDetailImages(formDetailImages.filter((_, idx) => idx !== index));
  };

  // Up & Down arrow for detail images
  const handleMoveDetailImage = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === formDetailImages.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const reordered = [...formDetailImages];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    setFormDetailImages(reordered);
  };

  // Drag & drop for details
  const handleImgDragStart = (idx: number) => {
    setDraggedImgIndex(idx);
  };

  const handleImgDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedImgIndex === null || draggedImgIndex === idx) return;

    const reordered = [...formDetailImages];
    const item = reordered[draggedImgIndex];
    reordered.splice(draggedImgIndex, 1);
    reordered.splice(idx, 0, item);

    setFormDetailImages(reordered);
    setDraggedImgIndex(idx);
  };

  const handleImgDragEnd = () => {
    setDraggedImgIndex(null);
  };

  // Save changes from Form (either Add or Edit mode)
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      setFormErrors("프로젝트 제목을 입력해 주세요.");
      return;
    }
    if (!formCoverImage) {
      setFormErrors("대표 커버 이미지를 업로드해 주세요.");
      return;
    }

    if (isCreatingNew) {
      // Add new project structure
      const newProj: Project = {
        id: "custom_" + Date.now().toString(),
        title: formTitle,
        description: formDescription,
        coverImage: formCoverImage,
        detailImages: formDetailImages,
        order: tempProjects.length + 1,
        isCustom: true,
      };
      
      const updated = [...tempProjects, newProj];
      handleSaveToSettings(updated);
      setIsCreatingNew(false);
    } else if (editingProject) {
      // Edit existing
      const updated = tempProjects.map((p) => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            title: formTitle,
            description: formDescription,
            coverImage: formCoverImage,
            detailImages: formDetailImages,
          };
        }
        return p;
      });

      handleSaveToSettings(updated);
      setEditingProject(null);
    }
  };

  // Reset/Discard forms
  const handleCancelForm = () => {
    setIsCreatingNew(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] px-6 py-10 md:px-12 md:py-16 selection:bg-neutral-200">
      <div className="max-w-4xl mx-auto w-full">
        {/* Back header */}
        <header className="mb-10 flex justify-between items-center pb-6 border-b border-neutral-100">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-[10px] md:text-sm font-display tracking-[0.2em] font-normal text-neutral-400 hover:text-neutral-900 transition-colors duration-300 py-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>포트폴리오 목록으로</span>
          </button>
          
          <h1 className="text-xs font-display tracking-[0.2em] font-normal text-neutral-400">
            관리자 센터
          </h1>
        </header>

        {/* Panel Switch */}
        <AnimatePresence mode="wait">
          {!isCreatingNew && !editingProject ? (
            // ==========================================
            // PROJECTS DASHBOARD VIEW (LIST & DUST)
            // ==========================================
            <motion.div
              key="list-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-base font-display text-neutral-800 font-semibold tracking-wide">
                    포트폴리오 프로젝트 라이브러리
                  </h2>
                  <p className="text-xs text-neutral-400 font-sans tracking-wide mt-1">
                    프로젝트 카드를 드래그하거나 화살표 단추를 조작해 전시 목록 표시 순서를 실시간 정렬할 수 있습니다.
                  </p>
                </div>

                <button
                  onClick={handleInitCreate}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white py-3 px-5 transition-colors duration-300"
                >
                  <Plus className="w-4 h-4" />
                  <span>프로젝트 추가</span>
                </button>
              </div>

              {/* Items Table / Row Lists */}
              <div className="space-y-3 mt-4">
                {tempProjects.map((p, idx) => (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={() => handleProjDragStart(idx)}
                    onDragOver={(e) => handleProjDragOver(e, idx)}
                    onDragEnd={handleProjDragEnd}
                    className={`flex items-center justify-between border p-3 rounded-none bg-white transition-all duration-300 ${
                      draggedProjectIndex === idx
                        ? "border-neutral-900 shadow-sm opacity-50 scale-99"
                        : "border-neutral-200/60 hover:border-neutral-400"
                    }`}
                  >
                    {/* Info */}
                    <div className="flex items-center gap-4 flex-grow min-w-0 pr-4">
                      {/* Drag handle */}
                      <div className="text-neutral-300 hover:text-neutral-500 cursor-grab active:cursor-grabbing p-1 hidden sm:block">
                        <GripVertical className="w-4 h-4" />
                      </div>

                      {/* Cover preview */}
                      <div className="w-16 h-12 bg-neutral-100 flex-shrink-0 overflow-hidden border border-neutral-100">
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Meta context */}
                      <div className="min-w-0 flex-grow">
                        <h4 className="text-xs font-display font-medium text-neutral-800 uppercase tracking-wider truncate">
                          {p.title}
                        </h4>
                        <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono mt-0.5">
                          #{idx + 1} • {p.detailImages?.length || 0}개의 상세사진
                        </p>
                      </div>
                    </div>

                    {/* Actions panel */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {/* Touch layout rearrangement arrows */}
                      <button
                        onClick={() => handleMoveProject(idx, "up")}
                        disabled={idx === 0}
                        className={`p-1.5 border border-neutral-100 rounded-none bg-neutral-50 transition-colors ${
                          idx === 0
                            ? "text-neutral-200"
                            : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                        }`}
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveProject(idx, "down")}
                        disabled={idx === tempProjects.length - 1}
                        className={`p-1.5 border border-neutral-100 rounded-none bg-neutral-50 transition-colors ${
                          idx === tempProjects.length - 1
                            ? "text-neutral-200"
                            : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                        }`}
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit click */}
                      <button
                        onClick={() => handleInitEdit(p)}
                        className="p-1.5 border border-neutral-100 rounded-none bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                        title="Edit Project Details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                       {/* Delete click */}
                      {deleteConfirmId === p.id ? (
                        <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-0.5 z-20">
                          <span className="text-[9px] font-medium text-red-600 tracking-wider uppercase">
                            삭제?
                          </span>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="text-[9px] uppercase font-bold text-red-700 bg-red-100 hover:bg-red-200 px-1.5 py-0.5"
                          >
                            예
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-neutral-400 hover:text-neutral-600 p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 border border-neutral-100 rounded-none bg-neutral-50 text-neutral-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
                          title="프로젝트 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 관리자 비밀번호 변경 섹션 */}
              <div className="bg-white border border-neutral-200/60 p-5 mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full"></span>
                  <h3 className="text-xs font-semibold tracking-wider text-neutral-800 uppercase">
                    관리자 비밀번호 설정
                  </h3>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans mb-4">
                  관리자 페이지 진입 비밀번호를 변경할 수 있습니다.
                </p>
                <form onSubmit={handleChangePassword} className="space-y-3 max-w-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <input
                        type="password"
                        placeholder="새 비밀번호"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-neutral-200 px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 bg-neutral-50/20"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="새 비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-neutral-200 px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 bg-neutral-50/20"
                        required
                      />
                    </div>
                  </div>

                  {passwordStatus && (
                    <p className={`text-[10px] ${passwordStatus.type === "success" ? "text-green-600" : "text-red-900 font-medium"}`}>
                      {passwordStatus.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-[10px] tracking-wider px-4 py-2 transition-all cursor-pointer"
                  >
                    비밀번호 변경하기
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            // ==========================================
            // PROJECT CREATION OR EDITING DETAILED FORM
            // ==========================================
            <motion.form
              key="edit-form"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSaveForm}
              className="space-y-8 bg-white border border-neutral-200/60 p-6 md:p-8"
            >
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-neutral-800">
                  {isCreatingNew ? "새 프로젝트 추가" : `프로젝트 수정: ${formTitle}`}
                </h3>
                <p className="text-[11px] text-neutral-400 font-sans tracking-wide mt-1">
                  제목, 설명 정보를 작성하고 고품질 대표 커버 이미지 및 상세 갤러리 이미지들을 업로드/관리하세요.
                </p>
              </div>

              {/* Errs */}
              {formErrors && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3">
                  {formErrors}
                </div>
              )}

              {/* Inputs */}
              <div className="space-y-5">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                    프로젝트 제목 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      if (formErrors) setFormErrors(null);
                    }}
                    placeholder="예시: 미니멀 콘크리트 빌라"
                    className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors bg-neutral-50/30"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                    상세 설명
                  </label>
                  <textarea
                    rows={4}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="공간 구조와 가공 기법, 적용된 건축 패러다임에 관한 해설을 입력하세요..."
                    className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors bg-neutral-50/30 font-light leading-relaxed"
                  />
                </div>

                {/* COVER IMAGE */}
                <div className="border-t border-neutral-100 pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-800">
                        대표 커버 이미지 *
                      </h4>
                      <p className="text-[10px] text-neutral-400 font-sans">
                        메인 뷰 그리드에 노출될 액티브 커버 이미지입니다. 자동으로 640px 너비로 압축·경량화됩니다.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      className="flex items-center gap-2 text-[10px] font-semibold tracking-wider py-1.5 px-3 border border-neutral-300 hover:border-neutral-900 text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      <Upload className="w-3 h-3" />
                      <span>파일 업로드</span>
                    </button>
                    <input
                      type="file"
                      ref={coverInputRef}
                      onChange={handleCoverUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {formCoverImage && (
                    <div className="relative w-full aspect-[16/9] md:w-56 overflow-hidden bg-neutral-100 border border-neutral-200 mt-2">
                      <img
                        src={formCoverImage}
                        alt="Cover preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormCoverImage("")}
                        className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black text-white transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* DETAILED IMAGES SECTION */}
                <div className="border-t border-neutral-100 pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-800">
                        갤러리 상세 사진 목록
                      </h4>
                      <p className="text-[10px] text-neutral-400 font-sans">
                        상세 페이지 내부 세로 슬라이드 형태로 순차 정렬될 고해상도 인테리어·스케치 사진 모음입니다. 드래그하여 순서를 맞추세요.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => detailsInputRef.current?.click()}
                      className="flex items-center gap-2 text-[10px] font-semibold tracking-wider py-1.5 px-3 border border-neutral-300 hover:border-neutral-900 text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      <Upload className="w-3 h-3" />
                      <span>여러 파일 업로드</span>
                    </button>
                    <input
                      type="file"
                      ref={detailsInputRef}
                      onChange={handleDetailsUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                  </div>

                  {isProcessingImage && (
                    <div className="text-xs text-neutral-400 font-sans flex items-center gap-2 py-1">
                      <div className="w-3.5 h-3.5 border-2 border-t-transparent border-neutral-500 rounded-full animate-spin" />
                      <span>파일 최적화 및 고품질 코덱 가압축 실행중...</span>
                    </div>
                  )}

                  {/* Details sorting row list */}
                  {formDetailImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      {formDetailImages.map((img, dIdx) => (
                        <div
                          key={`form-det-${dIdx}`}
                          draggable
                          onDragStart={() => handleImgDragStart(dIdx)}
                          onDragOver={(e) => handleImgDragOver(e, dIdx)}
                          onDragEnd={handleImgDragEnd}
                          className={`relative aspect-[4/3] bg-neutral-50 border overflow-hidden group transition-all duration-200 ${
                            draggedImgIndex === dIdx
                              ? "border-neutral-950 opacity-40 scale-95"
                              : "border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Preview detail ${dIdx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />

                          {/* Quick indicators of index order */}
                          <div className="absolute top-2 left-2 bg-black/50 text-[9px] text-white px-1.5 py-0.5 select-none uppercase font-mono">
                            #{dIdx + 1}
                          </div>

                          {/* Float sort handler & Delete icons */}
                          <div className="absolute bottom-2 right-2 flex gap-1 transform opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              type="button"
                              disabled={dIdx === 0}
                              onClick={() => handleMoveDetailImage(dIdx, "up")}
                              className="p-1 fill-white bg-black/60 text-white hover:bg-black/90 disabled:opacity-30 disabled:hover:bg-black/60"
                              title="Move Left"
                            >
                              <ArrowUp className="w-3 h-3 rotate-270" />
                            </button>
                            <button
                              type="button"
                              disabled={dIdx === formDetailImages.length - 1}
                              onClick={() => handleMoveDetailImage(dIdx, "down")}
                              className="p-1 fill-white bg-black/60 text-white hover:bg-black/90 disabled:opacity-30 disabled:hover:bg-black/60"
                              title="Move Right"
                            >
                              <ArrowDown className="w-3 h-3 rotate-270" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveDetailImage(dIdx)}
                              className="p-1 bg-red-650/80 text-white hover:bg-red-600"
                              title="Delete Detail Image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Form buttons */}
              <div className="border-t border-neutral-100 pt-8 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-5 py-3 border border-neutral-200 text-xs font-semibold tracking-wider text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 transition-all duration-350 bg-white"
                >
                  작성 취소
                </button>

                <button
                  type="submit"
                  disabled={isProcessingImage}
                  className="px-6 py-3 bg-neutral-900 text-white text-xs font-semibold tracking-wider hover:bg-neutral-800 disabled:bg-neutral-300 transition-all duration-350 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>프로젝트 저장하기</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
