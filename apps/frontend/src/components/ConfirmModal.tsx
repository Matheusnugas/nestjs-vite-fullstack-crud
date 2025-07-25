import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  loading?: boolean;
}

export default function ConfirmModal({ open, onClose, onConfirm, title, description, confirmText = 'Confirm', loading }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { ease: 'easeOut', duration: 0.18 } }}
          exit={{ opacity: 0, transition: { ease: 'easeIn', duration: 0.15 } }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs mx-2 relative"
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
            <div className="font-bold text-lg text-gray-800 mb-2">{title}</div>
            {description && <div className="text-gray-600 mb-4 text-sm">{description}</div>}
            <div className="flex gap-2 justify-end mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 cursor-pointer"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 cursor-pointer disabled:opacity-60"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? 'Deleting...' : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 