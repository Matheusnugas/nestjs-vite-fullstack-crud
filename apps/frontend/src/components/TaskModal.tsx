import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function TaskModal({ open, onClose, children }: TaskModalProps) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm sm:flex sm:items-center sm:justify-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { ease: 'easeOut', duration: 0.18 } }}
          exit={{ opacity: 0, transition: { ease: 'easeIn', duration: 0.15 } }}
        >
          {/* Mobile Drawer */}
          <motion.div
            className="sm:hidden fixed left-0 top-0 h-full w-full max-w-xs bg-white shadow-xl p-6 flex flex-col z-50 relative"
            initial={{ x: '-100%' }}
            animate={{ x: 0, transition: { ease: 'easeOut', duration: 0.22 } }}
            exit={{ x: '-100%', transition: { ease: 'easeIn', duration: 0.16 } }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mt-6">{children}</div>
          </motion.div>
          {/* Desktop Modal */}
          <motion.div
            className="hidden sm:block bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-2 relative"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.22 } }}
            exit={{ opacity: 0, y: 32, transition: { ease: 'easeIn', duration: 0.16 } }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 