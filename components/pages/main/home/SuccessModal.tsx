"use client";

import { CheckCircle, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

type SuccessModalProps = {
  movieTitle: string;
  onClose: () => void;
};

export function SuccessModal({ movieTitle, onClose }: SuccessModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-950 border border-white/[0.08] rounded-3xl shadow-2xl shadow-black/50 p-8 sm:p-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-red-500 to-rose-500 rounded-t-3xl"></div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-300 hover:bg-white/[0.05] rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-6">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full ring-1 ring-emerald-500/20">
              <CheckCircle className="h-10 w-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 id="modal-title" className="text-white text-2xl font-bold">
              با موفقیت اضافه شد
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              فیلم{" "}
              <span className="text-white font-semibold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                {movieTitle}
              </span>{" "}
              <br />
              به لیست تماشا شده‌های شما اضافه شد
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-base font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
}
