import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Lock, X, AlertCircle } from "lucide-react";

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminPasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError("");
      // Auto-focus physical or keyboard inputs
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Retrieve stored password, default to '7777'
    const stored = localStorage.getItem("ourwork_admin_password") || "7777";

    if (password === stored) {
      setError("");
      onSuccess();
    } else {
      setError("비밀번호가 일치하지 않습니다.");
      setPassword("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-sm bg-white border border-[#E5E5E2] p-6 shadow-xl relative"
        id="admin-auth-modal"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
          type="button"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-[#F9F9F7] border border-[#E5E5E2] rounded-full flex items-center justify-center mb-4 text-neutral-800">
            <Lock className="w-4 h-4" />
          </div>

          <h3 className="text-sm font-semibold tracking-wide text-neutral-900">
            관리자 인증 필요
          </h3>
          
          <p className="text-[11px] text-neutral-400 mt-1 max-w-[240px]">
            관리자 화면에 진입하려면 설정된 비밀번호를 입력해 주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="••••"
              className="w-full border border-[#E5E5E2] px-4 py-2.5 text-center tracking-widest text-lg font-mono focus:outline-none focus:border-neutral-900 transition-colors bg-[#F9F9F7]/50"
              required
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 justify-center text-red-600 text-[10px]"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-[#E1E1DE] text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 transition-all bg-white"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-neutral-900 text-white text-[11px] font-semibold hover:bg-neutral-800 transition-all"
            >
              확인
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
